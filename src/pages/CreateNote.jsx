import CreateNoteForm from "../components/CreateNoteForm";

const CreateNote = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create a New Sticky Note
        </h1>
        <p className="text-gray-600">
          Jot down your thoughts, ideas, or reminders
        </p>
      </div>

      <CreateNoteForm />
    </div>
  );
};

export default CreateNote;
