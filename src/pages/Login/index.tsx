
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthUser } from "../../context/Auth/auth.model";
import { useAuth } from "../../hooks/useAuth";
import { useLoader } from "../../hooks/useLoader";
import './styles.css';
import { Link, useLocation} from "react-router-dom";

export function Login(){

    const [authUser, setAuthUser] = useState<AuthUser>({ email: 'asealy@kana.systems', password: '123456'});
    //const [authUser, setAuthUser] = useState<AuthUser>();
    const { isAuthenticated, signIn } = useAuth();
    const navigate = useNavigate();
    const { setIsLoading } = useLoader();

    const [isAzureEnabled, setIsAzureEnabled] = useState(false);
    const [isGoogleEnabled, setIsGoogleEnabled] = useState(false);

    useEffect(() => {

        if(import.meta.env.VITE_AZURE_CLIENT_ID) {
            setIsAzureEnabled(true);
        }

        /*if(import.meta.env.VITE_GOOGLE_CLIENT_ID) {
            setIsGoogleEnabled(true);
        }*/

    }, []);

    // using EntraID authentication 
    useEffect(() => {
        setIsLoading(false);
        if(isAuthenticated){
            navigate('/datasets');
        }
    }, [isAuthenticated])
    
    function handleSignInAzure() {
        signIn('AZURE');
    }


    // using your own custom authentication 
    function handleSignInIntern(){
        if(!authUser.email) {
            alert('E-mail invalid')
            return;
        };

        if(!authUser.password) {
            alert('password invalid');
            return;
        }
        signIn('INTERN', authUser);
    }

    // using Google authentication
    /*function handleSignInGoogle(){
        signIn('GOOGLE');
    }*/

    return (
        <main className="login-page">
            <a href="https://login.microsoftonline.com/">
                    <button 
                        className="btn-sign-azure" 
                        disabled={!isAzureEnabled}
                        onClick={() => handleSignInAzure()}
                    >
                        <img src="src/assets/microsoft_logo.png"/>
                    </button><p className="azurelink">Azure Entra ID</p>  </a>
                   
            <h1 className="kanaTitle">Sign in to Kana Systems</h1>
            
            <section>
            
                <aside className="sign-buttons">
                    
                    {/*<button 
                        className="btn-sign-google"
                        disabled={!isGoogleEnabled} 
                        onClick={() => handleSignInGoogle()}
                    >
                        <img src="src/assets/google_logo.png"/>
                    </button>*/}
                </aside>

                <div> <img className="kanawavelogo" src="src/assets/KanaWaveLogo_no-back-ground.png"/>
                    <label htmlFor="email">E-mail:</label>
                    <input 
                        type="email" 
                        name="email" 
                        defaultValue={authUser.email}
                        onChange={(e) => setAuthUser({...authUser, email: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        defaultValue={authUser.password}
                        onChange={(e) => setAuthUser({...authUser, password: e.target.value })} />
                </div>

                <button className="btn-sign-intern" onClick={() => handleSignInIntern()}>Enter</button>

                {/*<footer>
                    {
                        !isAzureEnabled && <span>Azure clientId not informed on .env file</span>
                    }
                    /*{
                        !isGoogleEnabled && <span>Google clientId not informed on .env file</span>
                    }
                </footer>*/}
            </section>

            

        </main>
    );
}