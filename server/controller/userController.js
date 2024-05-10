import User from "../models/Users.js";
import Website from "../models/Website.js";

export const signup = async function(req, res) {
  const {username, email, password} = req.body;

  try {
    const alreadyRegistered = await User.findOne({email});
    const sameUsername = await User.findOne({username});
    if (alreadyRegistered) {
      return res.status(401).send(
          {message : "User Already Registered with the email..."});
    } else if (sameUsername) {
      return res.status(401).send({
        message : "Same username exists , please change the username...",
      });
    } else {
      const newUser = new User({
        username : username,
        email : email,
        password : password,
      });
      await newUser.save();
      return res.status(200).send({message : "SignUp Success"});
    }
  } catch (err) {
    return res.status(500).json({err});
  }
};

export const addDomString = async function(req, res) {
  const {username, linkKey, DOMString} = req.body;
  try {
    const newWebsite = new Website(
        {username : username, linkKey : linkKey, DOMString : DOMString});
    await newWebsite.save();
    return res.status(200).json({message : "Website added Successfully"});

  } catch (err) {
    return res.status(500).json({err});
  }
};