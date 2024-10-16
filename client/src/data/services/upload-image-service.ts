import { getAuthToken } from "@/lib/services/get-auth-token";

export async function uploadImageService(file: File, fileBuffer: ArrayBuffer) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token");

  const apiFormData = createFormData(file, fileBuffer);

  try {
    const response = await sendUploadRequest(authToken, apiFormData);
    const data = await handleResponse(response);
    return { data };
  } catch (error) {
    handleError(error);
  }
}

function createFormData(file: File, fileBuffer: ArrayBuffer): FormData {
  const formData = new FormData();
  formData.append("files", new Blob([fileBuffer], { type: file.type }), file.name);
  return formData;
}

async function sendUploadRequest(authToken: string, formData: FormData): Promise<Response> {
  return fetch("http://localhost:1337/api/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });
}

async function handleResponse(response: Response) {
  if (!response.ok) throw new Error("Failed to upload image");
  const data = await response.json();
  console.log(data, "data");
  return data;
}

function handleError(error: unknown): never {
  console.error(error);
  throw new Error(`Failed to upload image: ${error}`);
}
