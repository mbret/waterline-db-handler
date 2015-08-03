(function(){
    'use strict';
    module.exports = function(){
        return Promise
            .all([
                Models.UserRole.create({name: 'admin', displayName: 'Administrator'}),
                Models.UserRole.create({name: 'user', displayName: 'User'}),
                Models.ProductCategory.create({name: 'food', displayName: 'Food'}),
                Models.ProductCategory.create({name: 'drink', displayName: 'Drink'})
            ]);
            //.then(function(first){
            //    return Promise.all([
            //        //User.create({email: 'user@user.com', firstName: 'User', lastName: 'User'}),
            //        //User.create({email: 'user2@user2.com', firstName: 'User', lastName: 'User'}),
            //        //User.create({email: 'xmax54@gmail.com', firstName: 'Maxime', lastName: 'Bret'}),
            //        //User.create({ email: 'admin@admin.com', firstName: 'Admin', lastName: 'Admin', role: first[0].id }),
            //        //User.create({email: 'user3@user3.com', firstName: 'Darin', lastName: 'Manikkam'}),
            //        //User.create({email: 'user4@user4.com', firstName: 'Jean', lastName: 'Wisser'}),
            //        //User.create({email: 'user5@user5.com', firstName: 'Alexandre', lastName: 'Maouche'}),
            //        //User.create({email: 'user6@user6.com', firstName: 'Benjamin', lastName: 'Bogard'}),
            //        //User.create({email: 'user7@user7.com', firstName: 'Sébastien', lastName: 'Heysen'}),
            //        //User.create({email: 'user8@user8.com', firstName: 'Julien', lastName: 'Laurent'}),
            //    ]).then(function(values){
            //        return {
            //            usersRoles: [first[0], first[1]],
            //            users: values
            //        };
            //    });
            //})
            //.then(function(values){
            //    return Promise.all([
            //        //Product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', category: 2}),
            //        //Product.create({isOfficial: false, name: 'Chips', logo: 'chips', category: 1})
            //    ]).then(function(v){
            //        values.products = v;
            //        return values;
            //    });
            //})
            //.then(function(values){
            //    return Promise.all([
            //        //UserPassport.create({protocol: 'local', password: 'password', user: values.users[0].id}),
            //        //UserPassport.create({protocol: 'local', password: 'password', user: values.users[1].id}),
            //        //UserPassport.create({protocol: 'local', password: 'password', user: values.users[2].id}),
            //        //UserPassport.create({protocol: 'local', password: 'password', user: values.users[3].id}),
            //    ]).then(function(v){
            //        values.usersPassports = v;
            //        return values;
            //    });
            //})
            //.then(function(values){
            //    return Promise.all([
            //        // events
            //        //Event.create({name:'Soirée pyjama', description:'Venez tous nue', author: 2, place: 'Toul', date: '2014-12-31', id: 1}),
            //        //Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', author: 2, place: 'Coloc', date: '2014-12-01'}),
            //    ]).then(function(v){
            //        values.events = v;
            //        return values;
            //    });
            //})
            //.then(function(values){
            //    // Create friendships between users
            //    return Promise.all([
            //        //User.requestFriend(values.users[0].id, values.users[1].id),
            //        //User.requestFriend(values.users[1].id, values.users[0].id), // accept
            //        //User.requestFriend(values.users[0].id, values.users[2].id),
            //        //User.requestFriend(values.users[2].id, values.users[0].id), // accept
            //    ]).then(function(v){
            //        values.friends = v;
            //        return values;
            //    });
            //})
            //.then(function(values){
            //    return Promise .all([
            //        // products of events
            //        //EventProduct.create({eventid:values.events[0].id, userid: 2, productid: 2, quantity: 2}),
            //        //EventProduct.create({eventid:values.events[1].id, userid: 2, productid: 1, quantity: 1})
            //    ]);
            //});
    };
})();

