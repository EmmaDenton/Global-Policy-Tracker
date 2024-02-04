const { signToken, AuthenticationError } = require('../utils/auth');
const User = require('../models/User');
const Policy = require('../models/Policy');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { GraphQLError } = require('graphql');


const resolvers = {
  Query: {
    policies: async (_, args) => {
      return Policy.find(args);
    },
    policy: async (_, { _id }) => {
      return Policy.findById(_id);
    },
    me: async (_, args, context) => {
      if (context.user) {
        try {return await User.findById(context.user._id).populate('starredPolicies');
      }
        catch {e}{
          console.log(e.errors);
        }
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
    searchPolicies: async (_,  { policyInput = {} } ) => {
      try { 
        let query = {};
        if (policyInput.legislation) query.legislation = { $regex: policyInput.legislation, $options: "i" };
        if (policyInput.countryCode) query.countryCode = { $regex: policyInput.countryCode, $options: "i" };
        if (policyInput.topic) query.topic = { $regex: policyInput.topic, $options: "i" };
        if (policyInput.status) query.status = { $regex: policyInput.status, $options: "i" };
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
        throw new GraphQLError('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    addPolicy: async (_, args) => {
      return Policy.create(args);
    },
    updatePolicy: async (_, { _id, ...args }) => {
      return Policy.findByIdAndUpdate(_id, args, { new: true });
    },
    deletePolicy: async (_, { _id }) => {
      return Policy.findByIdAndDelete(_id);
    },
    
    starPolicy: async (_, { policyId }, { user }) => {
      if (!user) throw new Error('You are not authenticated');
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { starredPolicies: policyId } },
        { new: true, runValidators: true }
      ).populate('starredPolicies');
      return updatedUser;
    },
    unstarPolicy: async (_, { policyId }, { user }) => {
      if (!user) throw new Error('You are not authenticated');
      return User.findByIdAndUpdate(user._id, { $pull: { starredPolicies: policyId } }, { new: true }).populate('starredPolicies');
    },
  }
};

module.exports = resolvers;
