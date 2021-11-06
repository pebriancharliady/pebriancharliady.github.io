module.exports = {
  SiteTitle: 'Peb',
  Sitelogo: '#',
  SiteLogoText: 'Peb',
  SiteAuthor: 'Pebrian Charliady',
  SiteDescription: 'Self Taught Software Developer',
  defaultDescription: 'Software engineer!', 
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
    github: 'https://github.com/pebriancharliady',
    linkedin: 'https://www.linkedin.com/in/pebrian-charliady-191a8a173/',
  },
  SiteAddress: {
    city: 'Bandung',
    region: 'Jawa Barat',
    country: 'Indonesia',
    zipCode: 'ZipCode',
  },
  SiteContact: {
    email: 'pebriancharliady@gmail.com',
    phone: 'phone number',
  },
  SiteCopyright: '2021',
};
