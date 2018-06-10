module.exports = {
  secret: 'devdacticIsAwesome',
  database:
    process.env.DATABASE ||
    'mongodb://shlomoariel:a1345678@ds255260.mlab.com:55260/user-management-template',
};