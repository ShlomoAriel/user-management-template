module.exports = {
  secret: 'devdacticIsAwesome',
  database:
    process.env.DATABASE ||
    'mongodb://shlomoariel:a1345678@user-management-templat-shard-00-00.qseuh.mongodb.net:27017,user-management-templat-shard-00-01.qseuh.mongodb.net:27017,user-management-templat-shard-00-02.qseuh.mongodb.net:27017/user-management-template?ssl=true&replicaSet=atlas-i8gv06-shard-0&authSource=admin&retryWrites=true&w=majority'
};
