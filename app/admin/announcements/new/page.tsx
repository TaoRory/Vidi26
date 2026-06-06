import AnnouncementForm from "../AnnouncementForm";

export default function NewAnnouncementPage() {
  return (
    <div className="p-6">
      <h1
        className="text-xl font-bold uppercase tracking-wider mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Thêm thông báo mới
      </h1>
      <AnnouncementForm mode="new" />
    </div>
  );
}
