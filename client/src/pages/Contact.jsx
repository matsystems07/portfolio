import ContactForm from "../components/layout/ContactForm.jsx";

const Contact = () => {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <p className="text-lg mb-6 text-gray-700">
        Have a question, idea, or opportunity? Let’s talk.
      </p>
      <ContactForm />
    </section>
  );
};

export default Contact;
