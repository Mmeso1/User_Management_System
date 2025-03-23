const getUsersData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    return []; // Return an empty array in case of an error
  }
};

export default getUsersData; // Ensure default export
