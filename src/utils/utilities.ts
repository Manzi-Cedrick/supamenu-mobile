export const getInitials = (name:string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
        return nameParts[0][0] + nameParts[1][0];
    } else {
        return nameParts[0][0] + (nameParts[0][1] || '');
    }
};
