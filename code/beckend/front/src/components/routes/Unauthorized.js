import {useLocation, useNavigate} from "react-router-dom"
import {Button} from "primereact/button";
import useAuth from "../../core/hooks/useAuth";
import {useEffect} from "react";

const Unauthorized = () => {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state;
    const goBack = () => navigate("/");

    useEffect(() => {
        if(isLoggedIn) navigate('/members/trips');
    }, [isLoggedIn])

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <Button className="btn btn-secondary" onClick={goBack}>Go Home</Button>
            </div>
        </section>
    )
}

export default Unauthorized;