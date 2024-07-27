const domain =
  process.env.NEXT_PUBLIC_URL || (`https://scholar-sync.soorya-u.dev` as const);

export default async function sitemap() {
  const routes = ["", "/auth/login", "/auth/sign-up"].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
