// Utility to fetch all files recursively from a GitHub repo
export async function fetchGithubFilesRecursive(user, repo, branch = "main", path = "") {
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  let files = [];
  for (const item of data) {
    if (item.type === "file") {
      files.push({
        name: item.name,
        path: item.path,
        download_url: item.download_url,
      });
    } else if (item.type === "dir") {
      const subFiles = await fetchGithubFilesRecursive(user, repo, branch, item.path);
      files = files.concat(subFiles);
    }
  }
  return files;
}
