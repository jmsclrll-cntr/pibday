import React from 'react';
import InteractiveBirthdayGift from './InteractiveBirthdayGift';

function App() {
  return (
    <main className="min-h-screen w-full bg-[#12072B] text-white">
      <InteractiveBirthdayGift
        recipientName="Bestie"
        headerText="Happy Birthday, ALIIIIII!"
        subText="Sorry kung ganito lang actually kanina kolang na-code to HAHAHHAHHA, busy kasi ako nitong mga nakaraang araw"
        title="Happy Birthday! 🎉"
        message="May your day be filled with warm smiles, sweet moments, and all the love in the universe. Thank you for bringing so much light into the world!"
        senderName="With love & hugs ❤️"
      />
    </main>
  );
}

export default App;
