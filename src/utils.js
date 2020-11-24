const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMonthName = (date) => {
    if(date) {
        return monthNames[parseInt(new Date(date.toDate()).getMonth())];
    } 
    return null;
};