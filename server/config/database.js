module.exports = {
  secret: 'devdacticIsAwesome',
  database:
    process.env.DATABASE ||
    'mongodb+srv://shlomoariel:a1345678@user-management-templat.qseuh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
};
