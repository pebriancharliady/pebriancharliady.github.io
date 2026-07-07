module.exports = {
  SiteTitle: "Peb",
  Sitelogo: "#",
  SiteLogoText: "PEB",
  SiteAuthor: "Pebrian Charliady",
  SiteAuthorJa: "ペブリアン・チャリアディ",
  SiteRole: "Software Developer",
  SiteRoleJa: "ソフトウェア開発者",
  SiteDescription: "Self Taught Software Developer",
  defaultDescription: "Software engineer!",
  SiteDossier: {
    base: "Bandung, Indonesia",
    baseJa: "インドネシア・バンドン",
    coordinates: "6.91°S 107.61°E",
    timezone: "WIB",
    utcOffset: 7,
    stack: "React · TypeScript · Node",
    status: "Open to work",
  },
  githubApiQuery: `query ($number_of_repos: Int!) {
    viewer {
      name
      avatarUrl
      isHireable
      resourcePath
      repositories(last: $number_of_repos, privacy: PUBLIC, orderBy: { field: STARGAZERS, direction:ASC } ) {
        nodes {
          name
          description
          homepageUrl
          forkCount
          createdAt
          updatedAt
          resourcePath
          languages(last: 1, orderBy: { field: SIZE, direction:ASC } ) {
            edges {
              node {
                name
                color
              }
            }
          }
          licenseInfo {
            name
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }`,
  githubApiVariables: {
    number_of_repos: 12,
  },
  SiteSocialLinks: {
    github: "https://github.com/pebriancharliady",
    linkedin: "https://www.linkedin.com/in/pebrian-charliady-191a8a173/",
  },
  SiteAddress: {
    city: "Bandung",
    region: "Jawa Barat",
    country: "Indonesia",
    zipCode: "ZipCode",
  },
  SiteContact: {
    email: "pebriancharliady@gmail.com",
    phone: "phone number",
  },
  SiteCopyright: "2026",
}
