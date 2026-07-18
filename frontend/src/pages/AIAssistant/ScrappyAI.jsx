import ChatWidget from "../../components/Chatbot/ChatWidget";
import "./ScrappyAI.css";

export default function ScrappyAI() {

  return (

      <div className="page">

          <h1>Scrappy AI Assistant</h1>

          <p>
            Hello! Feel free to ask for help about campus events, clubs, and upcoming activities.
          
          </p>

        <ChatWidget />
      </div>
  );

} 
