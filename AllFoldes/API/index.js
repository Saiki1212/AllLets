const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require('jsonwebtoken')

const app = express();
const port = process.env.PORT || 80;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
// const a = 'mongodb+srv://Saiki1212:saikiran@cluster0.a0mfeld.mongodb.net/'
mongoose.connect(process.env.MONGO_URL|| "mongodb+srv://Saiki1212:saikiran@cluster0.a0mfeld.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
    .then(() => {
        console.log("Project connected to MongoDB.....")
    }).catch((error) => {
        console.log("Error while connecting to MongoDB.....",error)
    })

app.listen(port,() => {
    console.log("Project Server is running at your port ",port,".....")
})

app.get("/", (req, res) => {
    res.status(200).send({"success": true, "msg": "Node server running"});
});

const User = require('./Models/USER')
const SCourse = require('./Models/SelectedCourse')
const AllPosts = require('./Models/AllPosts')
const PostLikes = require('./Models/PostLikes')
const PostReply = require('./Models/PostReply')


const sendGreetingByMail = async( email,name, verificationToken) => {
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'teamcoderid@gmail.com',
            pass: 'qhhdptirzpcrehed'
        }
    })

    const mailOptions = {
        from: "letslearnteam.com",
        to: email,
        subject: `Welcome to Let's Learn.`,
        html: `<p>Hi ${name}! 🎉</p>
        <p>Welcome aboard <strong>Let's Learn App</strong>! We're thrilled to have you join our community of eager learners. Get ready to dive into a world of knowledge and discovery!</p>
        <p>We're here to support you every step of the way as you embark on your learning journey. Don't hesitate to reach out if you have any questions or need assistance.</p>
        <p>To get started, please verify your email address by clicking on the link below:</p>
        <p style="font-size: 24px;"><strong>               ---> <a href="https://letslearn-production.up.railway.app/verify/${verificationToken}">Verify Your Email</a> <---</strong></p>
        <p>Let's make learning an exciting adventure together!</p>
        <p>Best regards,</p>
        <p>The Let's Learn Team.</p>
        `
    }

    

    try {
        // console.log('50 : 50 : 50; 50 ; 50')
        await transporter.sendMail(mailOptions)
        
    } catch (error) {
        console.log("Error sending greetings email: ", error)
    }
}

const AddDefaultDetails = async(user) => {
    // adding dsa as default courses.....
    user.accountCreated = -100;
    user.selectedCourses.push({ name: 'Data Structures and Algorithms' });
    const cname = 'Data Structures and Algorithms'
    const course = await SCourse.findOne({name : cname});
    course.count = course.count + 1;
    await course.save();
    // console.log('Course added as default.')

    // adding friend to official account.....

    const officalUserId = '654b6c669241fc8adfac2452'
    const officialUser = await User.findById(officalUserId)
    user.friendsNames.push({username : officialUser.username})
    user.friends = user.friendsNames.length
    officialUser.friendsNames.push({username : user.username})
    officialUser.friends = officialUser.friendsNames.length
    await officialUser.save();
    // console.log('Both friends added as default')

    // adding new post for the new user.....
    const post = `
Hey all! 🌟 I'm ${user.name}, 
new to Let's Learn! Excited to dive into topics together. 
Any tips for a newbie like me? Let's learn together!`
    const newPost = new AllPosts({ username: user.username, post,totalLike:1,totalReply:1 });
    await newPost.save();
    user.posts = user.posts+1;
    await user.save();
    // console.log('post added as default.')

    // adding liked by official account on start.
    const existingLike = await AllPosts.findOne({ username: user.username })
    const postid = existingLike._id;
    const newLike = new PostLikes({ postid: postid, username: officialUser.username, likes: true });
    await newLike.save();

    // adding Like to official account by new user by start......
    const newLike1 = new PostLikes({ postid: '658aa49969022968febabaad', username: user.username, likes: true });
    const existingLikeOfDeveloper = await AllPosts.findById({ _id : '658aa49969022968febabaad'})
    existingLikeOfDeveloper.totalLike = existingLikeOfDeveloper.totalLike + 1;
    await existingLikeOfDeveloper.save();
    await newLike1.save();

    // console.log('post like added as default.')

    // adding response to new user from the official account.
    const defaultresponse = `Welcome, ${user.username}! 😊 It's fantastic to have you join us. Let's embark on this learning journey together !`;
    const newPost2 = new PostReply({ postid :postid ,username: officialUser.username, reply:defaultresponse });
    await newPost2.save();
    console.log('All added as default.');
}

// End point for SignUp .........

app.post('/register',async(req, res) => {
    try {

        const {name, email, username, password} = req.body

        const existingEmail = await User.findOne({email})
        const existingUername = await User.findOne({username})
        if(existingEmail) {
            return res.status(400).json({message: "Email already exist's"})
        }
        if(existingUername) {
            return res.status(400).json({message: "Email already exist's"})
        }
        const newUser = new User({name, email, username, password})
        newUser.verificationToken = crypto.randomBytes(20).toString('hex')
        await newUser.save()
        console.log("Sending email")
        sendGreetingByMail(newUser.email,newUser.name, newUser.verificationToken)
       
        console.log("completed All Registarion Process....")
        return res.status(200).json({message : 'Registration Successful'})

    } catch (error) {
        console.log('error in index.js at post register ... ', error)
        return res.status(500).json({message: 'Registration Failed'})
    }
})

// Verifying the email ......

app.get('/verify/:token', async (reqFromDB, resFromDB) => {
    try {
        // const token = reqFromDB.params.token
        const token = reqFromDB.params.token;
        // console.log('Token : ---->>>> : ', token)
        // Find user by given Token .......
        const user = await User.findOne({ verificationToken: token });
        // console.log('User : ---->>>> : ', user)
        if(!user) {
            return resFromDB.status(404).json({message: 'Invalid Verfication token'})
        }
        // Mark the user as verified .........
        user.verify = true
        user.verificationToken = undefined

        await user.save()
        const htmlResponse = `
            <div style="position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            background-color: #fff;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
                <p>Email verified successfully 🎉 </p>
                <p>Please go ahead and  - LOGIN - to the app.</p>
            </div>
        `;
        resFromDB.status(200).send(htmlResponse);

    } catch (error) {
        const htmlResponseFail = `
            <div style="position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            background-color: #fff;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
                <p>Email verified Failed ❌</p>
            </div>
        `;
        resFromDB.status(500).send(htmlResponseFail);
    }
})

// End point for login ........

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex')
    return secretKey
}
const secretKey = generateSecretKey()

app.post('/login', async(req,res) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({username:username})
        if(user) {
            if(user.password !== password) {
                return res.status(200).json({message: 'Invalid password'})
            }
            if(user.verify && user.accountCreated == 0) {
                user.accountCreated == -100;
                await user.save();
                AddDefaultDetails(user);
            }
            const token = jwt.sign({userId:user._id}, secretKey)
            return res.status(200).json({token})
        }
        const user1 = await User.findOne({email:username})
        if(user1) {
            if(user1.password !== password) {
                return res.status(200).json({message: 'Invalid password'})
            }
            if(user1.verify && user1.accountCreated == 0) {
                user1.accountCreated == -100;
                await user1.save();
                AddDefaultDetails(user1);
            }
            const token = jwt.sign({userId:user1._id}, secretKey)
            return res.status(200).json({token})
        }
        return res.status(200).json({message: 'Invalid username'})
    } catch (error) {
        res.status(500).json({message: 'Login failed'})
        console.log("Error login : ", error)
    }
})

//send OTP to reset password.....

app.post('/SendOtp', async(req, res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(200).json({message: 'Invalid username'})
        }

        const otp = Math.floor(Math.random() * 8000) + 1000;
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user:'teamcoderid@gmail.com',
                pass: 'qhhdptirzpcrehed'
            }
        })
        const mailOptions = {
            from: "teamletslearn.com",
            to: email,
            subject: `Let's learn ${user.name} verify the email for Let's Learn.`,
            text: `Hi, Welcome to Let's Learn App , OTP to reset password   
            
                            ${otp}`
        }
        try {
            await transporter.sendMail(mailOptions)
            
        } catch (error) {
            console.log("Error sending greetings email: ", error)
        }
        user.otp = otp
        await user.save()
        res.status(200).json({message:'Password resetted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Reset Password failed'})
        console.log("Error Reset Password : ", error)
    }
})

//verify the entered otp by user .....

app.post('/VerifyOtp', async(req, res) => {
    try {
        const {email, otp} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(200).json({message: 'Invalid email id'})
        }
        if(user.otp == otp) {
            user.otp = -50008830843
        }
        else {
            return res.status(400).json({message:'Invalid OTP.....'})
        }
        await user.save()
        res.status(200).json({message:'Password resetted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Reset Password failed'})
        console.log("Error Reset Password : ", error)
    }
})

// Resetting Password......

app.post('/ResetPassword', async(req, res) => {
    try {
        const {email, pass} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(200).json({message: 'Invalid username'})
        }
        user.password = pass;
        await user.save()
        res.status(200).json({message:'Password resetted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Reset Password failed'})
        console.log("Error Reset Password : ", error)
    }
})

// getting profile details ..... 

app.get('/profile/:userId', async(req, res) => {
    try {
        const userId = req.params.userId
        // console.log('Fetching user with userId:', userId);
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({message:'Error : User not found'})
        }
        res.status(200).json({user})

    } catch (error) {
        console.log('Error in index.js while getting user data : ', error)
        res.status(500).json({message:'Error while getting user data'})
    }
    // console.log('Fetching user completed');
})

// getting profile details by username.......

app.get('/profileByUsername', async(req, res) => {
    try {
        const { username } = req.query;
        let user = await User.findOne({username:username})
        if(user) {
            return res.status(200).json({user})
        }
        user = await User.findOne({email:username})
        if(user) {
            return res.status(200).json({user})
        }
        return res.status(404).json({message:'Error : User not found'})

    } catch (error) {
        console.log('Error in index.js while getting user data : ', error)
        res.status(500).json({message:'Error while getting user data'})
    }
    // console.log('Fetching user completed');
})

// getting profile details by email.......

app.get('/profileByEmail', async(req, res) => {
    try {
        const { email } = req.query;
        console.log('email ::: ', email)
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message:'Error : User not found'})
        }
        return res.status(200).json({user})

    } catch (error) {
        console.log('Error in index.js while getting user data : ', error)
        res.status(500).json({message:'Error while getting user data'})
    }
    // console.log('Fetching user completed');
})

// Getting all the users......

app.get('/all-users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all user details
        // console.log(users)
        return res.status(200).json({ users });
    } catch (error) {
        console.log('Error in index.js while fetching all users: ', error);
        res.status(500).json({ message: 'Error while fetching all users' });
    }
});

// posting selected courses......

app.post('/AddCourseToList', async(req, res) => {
    try {
        const {userId, CourseSelected} = req.body
        const user = await User.findById(userId)

        if(!user) {
            return res.status(500).json({message:'Error : User not found'})
        }

        if (user.selectedCourses.includes(CourseSelected)) {
            return res.status(400).json({ message: 'Course already added' });
        }

        user.selectedCourses.push({ name: CourseSelected });
        const name = CourseSelected
        const course = await SCourse.findOne({name});
        if(!course) {
            const newCourse = new SCourse({name});
            newCourse.count = 1;
            await newCourse.save();
        }
        else {
            course.count = course.count + 1;
            await course.save();
        }
        await user.save()

        res.status(200).json({message:'Courses saved Successfully'})

    } catch (error) {
        console.log('Error in AddTo List ::: ', error),
        res.status(500).json({message:'Error while Adding course to wish List'})
    }
})

//getting Course count...... 

app.get('/GetCourseCount', async(req, res) => {
    try {
        const AllCourse = await SCourse.find();
        return res.status(200).json({ AllCourse });
    } catch (error) {
        console.log('Error in index.js while getting all courses : ', error);
        res.status(500).json({ message: 'Error while fgetting all courses ' });
    }
})

// getting selected courses......

app.get('/AddedCourse/:userId', async(req, res) => {
    try {
        const userId = req.params.userId
        // console.log(userId)
        const user = await User.findById(userId)
        if(!user) {
            return res.status(500).json({message:'Error : User not found'})
            // return console.log('userId 2 : ', userId)
        }
        // console.log(user.name)
        
        const courses = user.selectedCourses
        if(!courses) {
            return res.status(404).json({message: 'courses 1 not Found'})
        }
        // console.log(courses)
        return res.status(200).json({courses})
        
    } catch (error) {
        console.log('Error in index.js getting courses : ', error)
        return res.status(500).json({message:'Error while getting courses'})
    }
})

// Endpoint for deleting courses from selected list.....

app.post('/RemoveCourse', async(req, res) => {
    try {
        const {name , userId} = req.body;
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({message: 'User 1 not Found'})
        }

        user.selectedCourses = user.selectedCourses.filter(course => course.name !== name)
        await user.save()
        
        const course = await SCourse.findOne({name});
        
        course.count = course.count - 1;
        await course.save();
        res.status(200).json({message: 'Course Removed Successfully'})
        console.log('Course removed successfully.....')
    } catch (error) {
        console.log('Error in index.js removing courses : ', error)
        res.status(500).json({message:'Error while Removing courses'})
    }
})

// Endpoint for deleting All courses from selected list.....

app.post('/RemoveAllCourse', async(req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({message: 'User 1 not Found'})
        }
        (async () => {
            for (const item of user.selectedCourses) {
              const course = await SCourse.findOne({ name: item.name });
              course.count = course.count - 1;
              await course.save();
            }
        })();

        user.selectedCourses = [];
        await user.save()
        
        res.status(200).json({message: 'Course Removed Successfully'})
        console.log('Course removed successfully.....')
    } catch (error) {
        console.log('Error in index.js removing courses : ', error)
        res.status(500).json({message:'Error while Removing courses'})
    }
})

// Adding general details and others of a user......

app.post('/AddingGeneralDetaiils',async(req, res) => {
    try {
        const {userId, profession, image, name, gender, collegeName, year, favSubject, mobileNumber} = req.body
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: 'User not Found'})
        }
        // if(profession)
            user.profession = profession
            
        // if(image)
            user.profilePic = image   

        if(name)
            user.name = name

        // if(gender)
            user.generalDetails.gender = gender   

        // if(collegeName)
            user.generalDetails.collegeName = collegeName

        // if(year)
            user.generalDetails.year = year   
            
        // if(favSubject)
            user.generalDetails.favSubject = favSubject

        // if(mobileNumber)
            user.generalDetails.mobileNumber = mobileNumber   
        
        await user.save()
        return res.status(200).json({message: 'details Added Successfully'})
    } catch (error) {
        console.log('Error in index.js changing details : ', error)
        res.status(500).json({message: 'Error while Adding the details'})
    }
    
})

// EndPoint for deleting the account permenently......

app.delete('/DeleteAccount/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete all posts related to the user.
        const allPosts = await AllPosts.find({ username: user.username });

        for (const post of allPosts) {
            const likedPosts = await PostLikes.find({ username: user.username });
            
            if (likedPosts.length > 0) {
                for (const likedPost of likedPosts) {
                    await AllPosts.findByIdAndUpdate(likedPost.postid, { $inc: { totalLike: -1 } });
                    await PostLikes.findByIdAndRemove(likedPost._id);
                    await PostLikes.deleteMany({postid: post._id});
                }
            }
            await PostLikes.deleteMany({postid: post._id});

            const repliedPosts = await PostReply.find({ username: user.username });
        
            if (repliedPosts.length > 0) {
                for (const repliedPost of repliedPosts) {
                    await AllPosts.findByIdAndUpdate(repliedPost.postid, { $inc: { totalReply: -1 } });
                    await PostReply.findByIdAndRemove(repliedPost._id);
                    await PostReply.deleteMany({postid: post._id});
                }
            }
                await PostReply.deleteMany({postid: post._id});
            
            await AllPosts.findByIdAndRemove(post._id);
        }
        
        

        // Unfollow the user's followers.
        for (const followerName of user.friendsNames) {
            const followers = await User.find({ username: followerName.username });
        
            for (const follower of followers) {
                if (follower) {
                    // Remove the user from the follower's friends list.
                    follower.friendsNames = follower.friendsNames.filter(friend => friend.username !== user.username);
                    follower.friends = follower.friendsNames.length;
                    await follower.save();
                }
            }
        }
        

        // Update the course counts.
        for (const courseName of user.selectedCourses) {
            const course = await SCourse.findOne({ name: courseName.name });
            
            if (course) {
                course.count = Math.max(0, course.count - 1);
                await course.save();
            }
        }

        // Delete the user.
        await User.findByIdAndRemove(userId);
        console.log('User deleted from DB');
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.log('Error while deleting account : ', error);
        res.status(500).json({ message: 'Error while deleting the user account !' });
    }
});

// Endpoint for AddingFriend......

app.post('/AddFriendToBothUsers', async(req, res) => {
    try {
        const {userId, id} = req.body

        console.log('User 1 id : ', userId);
        console.log('User 2 id : ', id);

        const user1 = await User.findById(userId)
        const user2 = await User.findById(id)
        
        if(!user1) {
            return res.status(404).json({message: 'User 1 not Found'})
        }
        if(!user2) {
            return res.status(404).json({message: 'User 2 not Found'})
        }
        console.log('User 1 : ', user1.name);
        console.log('User 2 : ', user2.name);

        user1.friendsNames.push({username : user2.username})
        user2.friendsNames.push({username : user1.username})
        user2.friends = user2.friendsNames.length
        user1.friends = user1.friendsNames.length

        await user1.save()
        await user2.save()
        console.log('Friends added successfully');

        return res.status(200).json({message: 'Friends Added Successfully'})

    } catch (error) {
        console.log('Error in index.js Adding Friends : ', error)
        res.status(500).json({message: 'Error while Adding Friends'})
    }
})

// EndPoint for unfloowing Friend......

app.post('/UnfollowBothUsers', async(req, res) => {
    try {
        const {userId, id} = req.body

        console.log('User 1 id : ', userId);
        console.log('User 2 id : ', id);

        const user1 = await User.findById(userId)
        const user2 = await User.findById(id)
        if(!user1) {
            return res.status(404).json({message: 'User 1 not Found'})
        }
        if(!user2) {
            return res.status(404).json({message: 'User 2 not Found'})
        }

        console.log('User 1 : ', user1.name);
        console.log('User 2 : ', user2.name);

        const areFriends =
            user1.friendsNames.some((friend) => friend.username === user2.username) &&
            user2.friendsNames.some((friend) => friend.username === user1.username);

        if(areFriends) {
            user1.friendsNames = user1.friendsNames.filter(friend => friend.username !== user2.username);
            user2.friendsNames = user2.friendsNames.filter(friend => friend.username !== user1.username);
            user2.friends = user2.friendsNames.length
            user1.friends = user1.friendsNames.length
            await user1.save()
            await user2.save()
        }
        console.log('Friends removed successfully');
        return res.status(200).json({message: 'Friends Removed Successfully'})

    } catch (error) {
        console.log('Error in index.js Removing Friends : ', error)
        res.status(500).json({message: 'Error while Removing Friends'})
    }
})

// Endpoint for posting post and increment posts value and update post in my friends......
  
app.post ('/UpdatingPosts', async(req, res) => {
    try {
    const {username, post} = req.body;
    // console.log('Username : ',username)
    const user = await User.findOne({ username: username });
    if(!user) {
        return res.status(500).json({message: 'User not found'})
    }
    const newPost = new AllPosts({ username, post });
    await newPost.save();
    user.posts = user.posts+1;
    // console.log(user.posts)
    await user.save();
    console.log('Post added successFully')
    res.status(200).json({message: 'Post added successfully'});
    } catch (error) {
        console.log('Error in index.js Updating Posts : ', error)
        res.status(500).json({message: 'Error while Updating Posts'})
    }
})

// endpoint for editing post.................

app.post ('/EditPost', async(req, res) => {
    try {
    const { postid, post } = req.body;
    const findp = await AllPosts.findById({ _id: postid });
    if(!findp) {
        return res.status(500).json({message: 'post not found'})
    }
    findp.post = post;
    await findp.save();
    console.log('Post edited successFully')
    res.status(200).json({message: 'Post edited successfully'});
    } catch (error) {
        console.log('Error in index.js editing Posts : ', error)
        res.status(500).json({message: 'Error while editing Posts'})
    }
})

// Endpoint for deleting post and decrementing posts value and update post in my friends...... 

app.post('/RemovingPost', async(req, res) => {
    try {
        // await RemovePost(userId, postId);
        const {postid, userId} = req.body;
        const user = await User.findById(userId);
        const findp = await AllPosts.findById({ _id: postid });
        const findL = await PostLikes.findOne({postid: postid});
        const findR = await PostReply.findOne({postid: postid});
        if(!user) {
            return res.status(500).json({message: 'user not found'})
        }
        if(!findp) {
            return res.status(500).json({message: 'post not found'})
        }
        await AllPosts.deleteMany({ _id: postid});
        user.posts = user.posts-1;
        await user.save();
        if(findL) {
            await PostLikes.deleteMany({postid: postid});
        }
        if(findR) {
            await PostReply.deleteMany({postid: postid});
        }
        console.log('Post deleted successFully')
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log('Error in index.js deleting Posts : ', error)
        res.status(500).json({message: 'Error while deleting Posts'})
    }
})

// Endpoint for getting only friends.....

app.get('/friends/:username', async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({username: username}); // Retrieve your user details
        if (!user) {
            return res.status(404).json({ message: 'User not fou nd' });
        }

        const friendNames = user.friendsNames.map(friend => friend.username);

        // Find users whose names are in the friendNames array
        // console.log('friendNames : ', friendNames)
        // return ;

        // const friends = await User.find({ username: { $in: friendNames } }).select('username');
        const allFriends = [];
        for (const friend of friendNames) {
            const posts = await AllPosts.find({ username: friend });
            allFriends.push(...posts);
        }
        // console.log('allFriends : ', allFriends)
        res.status(200).json({ allFriends });
    } catch (error) {
        console.log('Error while fetching friends: ', error);
        res.status(500).json({ message: 'Error while fetching friends' });
    }
});

// Endpoint Post Liked........

app.post('/likedPost', async(req, res) => {
    try {
        const {username, postid} = req.body;
        const existingLike = await PostLikes.findOne({ postid: postid, username: username });

        const post = await AllPosts.findById({ _id:postid })
        // console.log(post)
        
        if(existingLike) {
            const pid  = existingLike._id
            await PostLikes.findOneAndRemove({ _id : pid });
            post.totalLike = post.totalLike - 1;
            await post.save()
            // console.log('removed')
        }
        else {
            const newLike = new PostLikes({ postid: postid, username: username, likes: true });
            await newLike.save();
            post.totalLike = post.totalLike + 1;
            await post.save()
            // console.log('new')
        }
        return res.status(200).json({message: 'Success like updated'});

    } catch (error) {
        console.log('Error while Like Updated: ', error);
        return res.status(500).json({ message: 'Error while Like Updated' });
    }
})

// Endpoint for getting All Likes by username......

app.get('/LikeForAUser/:username', async(req, res) => {
    try {
        const username = req.params.username
        // console.log(username)
        const likes = await PostLikes.find({username});
        // console.log('likesList : ', likes)
        return res.status(200).json(likes);
    } catch (error) {
        console.log('Error while Like List : ', error);
        return res.status(500).json({ message: 'Error while Like List ' });
    }
})

// Endpoint for SingleUser posts....... 
app.get('/UserPosts/:userId', async(req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if(!user) {
            return res.status(500).json({message: 'User not found'})
        }
        // console.log('user.username')
        const myposts = await AllPosts.find({username : user.username})
        return res.status(200).json({myposts});

    } catch (error) {
        console.log('Error in My posts.');
        return res.status(500).json({message: 'Error while getting My Posts'});
    }
    
})

// Endpoint for updating the reply .........

app.post('/UpdatingReply', async(req, res) => {
    try {
        const {username, reply, postid} = req.body;
        // console.log('Username : ',username)
        // console.log('reply : ',reply)
        // console.log('postid : ',postid)
        const user = await User.findOne({ username: username });
        
        if(!user) {
            return res.status(500).json({message: 'User not found'})
        }
        const newPostReply = new PostReply({ username: username, reply: reply, postid: postid });
        await newPostReply.save();
        const post = await AllPosts.findById(postid);
        if(post) {
            post.totalReply = post.totalReply + 1;
            await post.save();
        }

        // console.log(user.posts)
        await user.save();
        console.log('Post Reply added successFully')
        res.status(200).json({message: 'Post Reply added successfully'});

    } catch (error) {
        console.log('Error in index.js Updating Posts Reply : ', error)
        res.status(500).json({message: 'Error while Updating Posts Reply'})
    }
})

// endpoint for fetching Replies Of a Post.......

app.get('/fetchingRepliesOfAPost/:postid', async(req, res) => {
    try {
        const postid = req.params.postid
        const replies = await PostReply.find({postid: postid})
        if(!replies) {
            return res.status(500).json({message: 'replies not found'})
        }
        return res.status(200).json({replies})

    } catch (error) {
        console.log('Error in index.js fetching Posts Reply : ', error)
        return res.status(500).json({message: 'Error while fetching Posts Reply'})
    }
})