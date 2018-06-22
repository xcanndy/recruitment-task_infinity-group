const sections = document.querySelectorAll('section');

const createSectionsCounter = (array) => {
  const sections = [...array];
  sections.map((section, index) => {
    const sectionsCounterContainer = document.createElement('div');
    sectionsCounterContainer.classList.add('modal','modal--sections-counter');
    sectionsCounterContainer.setAttribute('data-active', false);
    if(section.id === 'clientsSection')
      sectionsCounterContainer.setAttribute('data-color', 'light');
    else 
      sectionsCounterContainer.setAttribute('data-color', 'dark');
    sectionsCounterContainer.innerText = `${index+1}/${sections.length}`;

    section.append(sectionsCounterContainer);
  });
}

createSectionsCounter(sections);