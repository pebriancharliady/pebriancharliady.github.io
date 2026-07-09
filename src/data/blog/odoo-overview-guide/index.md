---
title: "Odoo, explained: a field guide to the ERP that runs the whole company"
date: "2026-05-30T09:00:00.000Z"
image: './cover.png'
imageCredit: https://pebriancharliady.github.io
time: 11
categories: ['odoo', 'erp', 'python']
description: "What Odoo actually is, how Community and Enterprise differ, how the architecture fits together (ORM, XML views, OWL), what a custom module looks like, and how to decide if it's the right call for a business."
---

Odoo is one of those systems people either run their entire company on or have never heard of. This is the overview I give clients and new developers: what it is, how it's built, what customizing it actually looks like, and when it's the right (or wrong) tool.

## What Odoo is

Odoo is an open-source **ERP** — a single platform where a company's sales, inventory, accounting, HR, manufacturing, website, and support all live in one database and talk to each other. The pitch is integration: a confirmed sales order reserves stock, drafts the invoice, and updates the salesperson's pipeline without anyone re-entering data or syncing three SaaS tools over Zapier.

It's structured as a core framework plus **modules** (Odoo calls them apps). You start with what you need — say CRM and Invoicing — and switch on Inventory or Manufacturing later. Everything shares the same users, permissions, reporting, and chatter (the activity log attached to every record).

The stack underneath: **Python** on the server, **PostgreSQL** as the only supported database, XML for view definitions, and **OWL** (Odoo Web Library, a small component framework in the React/Vue family) for the web client. A new major version ships every October.

## Community vs Enterprise

This is the first decision, and the first source of confusion:

- **Odoo Community** is free and open source (LGPLv3). It includes the framework and a large set of core apps — CRM, Sales, Inventory, Invoicing, Purchase, Manufacturing, Website, and more. You can run a real business on it.
- **Odoo Enterprise** is the commercial edition: a per-user subscription that adds the full Accounting app (Community has invoicing but not the complete accounting suite), Payroll, Studio (a point-and-click customizer), advanced reporting, the mobile apps, multi-company consolidation features, and access to hosted upgrades.

Hosting is the second decision, with three options:

1. **Odoo Online** — SaaS, hosted by Odoo. Fastest to start, but no custom Python modules; you customize within Studio's limits. Good for standard-process businesses.
2. **Odoo.sh** — Odoo's PaaS. Git-driven deployments, staging branches, backups managed for you, and full custom module support. The usual choice for serious custom work without an ops team.
3. **On-premise / self-hosted** — full control, your infrastructure, your problem. Chosen for data-residency requirements or heavy integration landscapes.

## How the architecture fits together

Almost everything in Odoo follows one pattern: **models** describe data, **views** describe UI, and the framework generates the rest.

A model is a Python class; the ORM maps it to a PostgreSQL table, builds the CRUD layer, handles access rights, and wires up relations:

```python
from odoo import api, fields, models


class WorkshopSession(models.Model):
    _name = "workshop.session"
    _description = "Training Session"

    name = fields.Char(required=True)
    start_date = fields.Datetime()
    seats = fields.Integer(default=10)
    instructor_id = fields.Many2one("res.partner", string="Instructor")
    attendee_ids = fields.Many2many("res.partner", string="Attendees")
    taken_seats = fields.Float(compute="_compute_taken_seats")

    @api.depends("seats", "attendee_ids")
    def _compute_taken_seats(self):
        for session in self:
            session.taken_seats = (
                100.0 * len(session.attendee_ids) / session.seats
                if session.seats
                else 0.0
            )
```

That one class gets you the table, the API, computed fields that recalculate when dependencies change, and record-level chatter if you inherit the right mixin. The UI is declared separately in XML:

```xml
<record id="workshop_session_view_form" model="ir.ui.view">
  <field name="name">workshop.session.form</field>
  <field name="model">workshop.session</field>
  <field name="arch" type="xml">
    <form string="Session">
      <sheet>
        <group>
          <field name="name"/>
          <field name="start_date"/>
          <field name="seats"/>
          <field name="instructor_id"/>
        </group>
        <notebook>
          <page string="Attendees">
            <field name="attendee_ids"/>
          </page>
        </notebook>
      </sheet>
    </form>
  </field>
</record>
```

Form, list, kanban, calendar, pivot, and graph views are all declared this way. You describe *what* fields appear where; rendering, saving, validation, and permissions come from the framework.

## Anatomy of a module

A custom module is a directory with a manifest. The scaffold command (`odoo-bin scaffold my_module addons/`) generates the skeleton:

```
my_module/
├── __init__.py
├── __manifest__.py          # metadata + file registry
├── models/
│   ├── __init__.py
│   └── workshop_session.py
├── views/
│   └── workshop_views.xml
├── security/
│   └── ir.model.access.csv  # who can read/write/create/delete
└── data/
    └── demo_data.xml
```

```python
# __manifest__.py
{
    "name": "Workshop Management",
    "version": "1.0",
    "category": "Services",
    "depends": ["base", "mail"],   # modules this one builds on
    "data": [
        "security/ir.model.access.csv",
        "views/workshop_views.xml",
    ],
    "application": True,
}
```

The `depends` list matters more than it looks: it's how modules compose. Depend on `sale` and you can extend sales orders; depend on `mail` and your records get chatter and followers.

## The killer feature: inheritance without forking

The reason Odoo customization stays maintainable is that you never edit core code. Both models and views support **inheritance** — your module layers changes on top:

```python
class SaleOrder(models.Model):
    _inherit = "sale.order"   # extend the existing model in place

    delivery_instructions = fields.Text()

    def action_confirm(self):
        # add behavior around the standard confirmation
        res = super().action_confirm()
        self._notify_warehouse_team()
        return res
```

Views are extended the same way, using XPath to inject fields into the existing UI:

```xml
<record id="sale_order_form_delivery" model="ir.ui.view">
  <field name="name">sale.order.form.delivery</field>
  <field name="model">sale.order</field>
  <field name="inherit_id" ref="sale.view_order_form"/>
  <field name="arch" type="xml">
    <xpath expr="//field[@name='payment_term_id']" position="after">
      <field name="delivery_instructions"/>
    </xpath>
  </field>
</record>
```

Core stays untouched, your changes live in one uninstallable module, and upgrades remain *possible* — the yearly major version is still real work, but it's migration work, not un-forking work.

Beyond your own modules, the **OCA (Odoo Community Association)** maintains thousands of quality open-source modules — always worth checking before building something "custom" that half the ecosystem already needed.

## When Odoo is the right call

Odoo shines when:

- The pain is **fragmentation** — five disconnected tools, spreadsheets as glue, data re-entered between systems.
- Processes are **mostly standard** with a few company-specific twists — the 80% comes out of the box, the 20% is a thin custom module.
- The budget is **mid-market** — you want SAP-shaped integration without SAP-shaped consulting invoices.

Be more careful when:

- One deep vertical dominates and best-of-breed software for it exists — Odoo does *many* things well, not everything best.
- The plan involves **fighting the framework** — reshaping core workflows wholesale instead of extending them. Odoo rewards businesses that adapt 20% of their process to the tool; it punishes rebuilds of the tool around the process.
- Nobody owns the yearly **upgrade path**. Skipping four versions and then jumping is far more painful than staying reasonably current.

## Getting started as a developer

Shortest useful path: run Community locally with Docker or `odoo-bin`, work through the official *Server framework 101* tutorial (build the real estate module — it covers models, views, inheritance, and security in one arc), then read the source of a small core module like `note`. The source is the real documentation; one of Odoo's underrated virtues is that the answer to "how does the framework want me to do this?" is always sitting in a core module you can read.

The mental model to keep: **Odoo is a framework wearing an ERP costume.** Treat it like a framework — respect its conventions, extend instead of edit, keep customizations thin — and it repays you with an integrated system that would take years to assemble from parts.
