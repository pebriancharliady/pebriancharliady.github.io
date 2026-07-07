import React, { useEffect, useState } from "react"

const pad = n => String(n).padStart(2, "0")

/* Ticks in the site's home timezone regardless of where the viewer is. */
const StatusClock = ({ utcOffset = 7, zone = "WIB" }) => {
  const [now, setNow] = useState(null)

  useEffect(() => {
    const update = () => setNow(new Date())
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!now) return <span className="clock">--:--:-- {zone}</span>

  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
  const local = new Date(utcMs + utcOffset * 3600000)

  return (
    <span className="clock">
      {pad(local.getHours())}:{pad(local.getMinutes())}:
      {pad(local.getSeconds())} {zone}
    </span>
  )
}

export default StatusClock
