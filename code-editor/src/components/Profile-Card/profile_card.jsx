import './index.css'



const ProfileCard = ({name,bio})=>{
    return(
        <div className="profile_card">
            <p className="name">Name:{name}</p>
            <p className="bio">Bio:{bio}</p>
            <p></p>
        </div>
    )
}
export default ProfileCard;