"use server";

export const registerDevice = async (formData: FormData) => {
  const deviceName = formData.get("deviceName");

  console.log(deviceName);

  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};
