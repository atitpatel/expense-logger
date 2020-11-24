const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMonthName = (date) => {
    if(date) {
        return monthNames[parseInt(new Date(date.toDate()).getMonth())];
    } 
    return null;
};

export const imagePickerOptions = {
  noData: true,
};

export const getFileLocalPath = response => {
  console.log("util func", response);
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};

export const getFileName = (name, path) => {
  if (name) { 
    return storageRef.ref(name);; 
  }
  if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
  }
  return path.split("/").pop();
}