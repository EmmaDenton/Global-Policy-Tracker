const { signToken, AuthenticationError } = require('../utils/auth');
const User = require('../models/User');
const Policy = require('../models/Policy');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    checkout: async (parent, args, context) => {
      console.log(context.headers);
      const url = new URL(context.headers.referer).origin;
     
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[{
          price_data: {
            currency: 'aud',
            product_data: {
              name: "Donation",
              description: "Donate us!",
            },
            unit_amount: 5 *100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    searchPolicies: async (_,  input ) => {
      try { 
        console.log(legislation)
        let query = {};
        if (input.policyInput.legislation) query.legislation = { $regex: input.policyInput.legislation, $options: "i" };
        // if (countryCode) query.countryCode = countryCode;
        // if (topic) query.topic = topic;
        // if (status) query.status = status;
        return await Policy.find(query);
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching policies');
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
  }
};

module.exports = resolvers;
