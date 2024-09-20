import { useAuth } from "../../hooks/useAuth";
import './styles.css';

export function Datasets(){
    const { signOut, getAuthMethodType, user } = useAuth();
    return (
        <main className="home-page">
            <h1>Datasets Page</h1>
            {
                !user ? <h1>...</h1> 
                : (
                    <div>
                        {
                            !!user.photo && (
                                <aside className="photo">
                                    <img src={user.photo} />
                                </aside>
                            )
                        }
                        <p>
                            <span>E-mail: </span>
                            <strong>{user.email}</strong>
                        </p>
                        <p>
                            <span>Username: </span>
                            <strong>{user.username}</strong>
                        </p>
                        <p>
                            <span>Authentication type:  </span>
                            <strong>{getAuthMethodType()}</strong>
                        </p>
                    </div>
                )
            }
            <button onClick={() => signOut()}>Sign out</button>
        </main>
    );
}

