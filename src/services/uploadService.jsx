export async function upload(file, folder) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("project", "tweet");
  formData.append("folder", folder);

  const response = await fetch("https://www.steverlynck.fr/api/upload.php", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.url;
}
