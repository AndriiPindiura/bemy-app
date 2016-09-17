import User from '../models/user';

export default (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
};
// export default (id, done) => {
//   if (parseInt(id, 2)) {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   } else {
//     User.findOne({ facebook: id }, (err, user) => {
//       done(err, user);
//     });
//   }
// };
