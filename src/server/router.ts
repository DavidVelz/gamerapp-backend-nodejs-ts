import { Router } from 'express';

class GamersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/login', (req,res,next) =>{
            res.json({
                text: 'login'
            });

        } );
        this.router.get('/',(req,res,next) =>{
            res.json({
                text: 'home'
            });

        });
        this.router.get('/profile', (req,res,next) =>{
            res.json({
                text: 'profile'
            });

        });
    }

}

const gamersroutes = new GamersRoutes();
export default gamersroutes.router;