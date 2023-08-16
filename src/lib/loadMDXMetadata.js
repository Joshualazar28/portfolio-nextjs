import glob from 'fast-glob'

const exportNames = {
  blog: 'article',
  work: 'caseStudy',
}

export async function loadMDXMetadata(directory) {
  return (
    await Promise.all(
      (
        await glob('**/page.mdx', { cwd: `src/app/${directory}` })
      ).map(async (filename) => {
        let metadata = (await import(`../app/${directory}/${filename}`))[
          exportNames[directory]
        ]
        return {
          href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          metadata,
          ...metadata,
        }
      })
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}
