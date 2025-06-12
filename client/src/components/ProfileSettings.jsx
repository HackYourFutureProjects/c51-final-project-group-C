import ProfilePhotoUploader from "./ProfilePhotoUploader";

const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <div className="settings-sections space-y-8">
        <section className="profile-photo-uploader-section">
          <ProfilePhotoUploader />
        </section>
      </div>
    </div>
  );
};

export default ProfileSettings;
