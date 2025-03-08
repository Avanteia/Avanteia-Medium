const Content = ({ content, searchQuery }) => {
    // Function to highlight search query in the text
    const highlightText = (text, query) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, 'gi'));
      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="bg-yellow-300">{part}</span>
        ) : (
          part
        )
      );
    };
  
    return (
      <div>
        {content.map((item, index) => (
          <p key={index} className="mb-4">
            {highlightText(item, searchQuery)}
          </p>
        ))}
      </div>
    );
  };
  
  export default Content;
  