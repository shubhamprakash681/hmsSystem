import express from 'express';
import expressAsyncErrors from 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import ejsMate from 'ejs-mate';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// middleware imports
import notFound from './middleware/notFound.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import adminMiddleware from './middleware/adminMiddleware.js';

// models imports
import Admin from './models/Admin.js';
import Patient from './models/Patient.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



// ejs setups
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// variables
var count = 200;
var isAdminLoggedIn = 'false';



// route app.use()
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/test', (req, res) => {
    
    res.render('test.ejs', {count}
    );
});
app.get('/patients', async (req, res) => {
    const patients = await Patient.find({});
    res.render('components/index', { patients })
});
app.get('/patients/new', (req, res) => {
   
    res.render('components/new');
})

app.post('/patients', async (req, res) => {
    const patient = new Patient(req.body.patient);
    await patient.save();
    res.redirect(`/patients/${patient._id}`);
    count--;
})

app.get('/patients/:id', async (req, res,) => {
    const patient = await Patient.findById(req.params.id);
    res.render('show', { patient, isAdminLoggedIn});
});

app.get('/patients/:id/edit', async (req, res) => {
    const patient= await Patient.findById(req.params.id)
    res.render('components/edit', { patient });
})

app.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, { ...req.body.patient });
    res.redirect(`/patients/${patient._id}`)
});  //not wotking

///admin systems
app.get('/adminlogin',  (req, res) => {
    res.render('adminLogin.ejs')
}); //working
// app.get('/adminLogin', (req, res) => {
    
//     res.render('adminLogin.ejs', {isAdminLoggedIn}
//     );
// });

// app.get('/test', (req, res) => {
    
//     res.render('test.ejs', {count}
//     );
// });

app.post('/adminlogin', async (req, res) => {
    console.log(req.body);
    var { email, password, role } = req.body;
    if (!email || !password) {
        res
            .status(400)
            .json({ error: 'Please enter Email and Password' });
    }

    let currModel;
    if (role === 'admin') {
        currModel = Admin;

        const user = await currModel.findOne({email: email});
        if (!user) {
            res.status(400)
                .json({ error: 'User Not Found' })
        }

        const isAuthentic = await user.checkPassword(password);
        if (isAuthentic) {
            const token = user.generateAuthToken();
            // res.status(200).json({ token });
            isAdminLoggedIn = true;

            

            res.redirect(`/patients/`);
        } else {
            res.status(401)
                .json({ error: 'Invalid Credentials' });
        }
    } else {
        res.status(401)
                .json({ error: 'Invalid Credentials' });
    }

    
})
///admin systems


app.delete('/patients/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    await Patient.findByIdAndDelete(id);
    res.redirect('/patients');
    count++;
})


app.post('/registerAdmin', async (req, res) => {
    const { role, user } = req.body;
    console.log(user);
    let currModel;
    if (role === 'admin') {
        currModel = Admin;
        const newUser = await currModel.create({ ...user });
    
        if (newUser) {
            const token = newUser.generateAuthToken();
            res.status(200).json({ token });
        } else {
            res.status(400)
                .json({ error: 'User not Saved' });
        }
    } else {
        res.status(400)
                .json({ error: 'Non-Admin Model' });
    }

}); //working



// middleware for errors
app.use(notFound);
app.use(errorHandlerMiddleware);
console.log(isAdminLoggedIn);
export default app;