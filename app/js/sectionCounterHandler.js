const sections = document.querySelectorAll('section');

const createSectionCounter = array => {
  const sections = [...array];
  sections.map((section, index) => {
    section.setAttribute('data-index', index+1);
    const sectionCounterContainer = document.createElement('div');
    sectionCounterContainer.classList.add('modal','modal--section-counter');
    sectionCounterContainer.setAttribute('data-active', false);
    sectionCounterContainer.setAttribute('aria-hidden', true);
    if(section.id === 'clientsSection')
      sectionCounterContainer.setAttribute('data-color', 'light');
    else 
      sectionCounterContainer.setAttribute('data-color', 'dark');
    sectionCounterContainer.innerText = `${index+1}/${sections.length}`;

    section.append(sectionCounterContainer);
  });
}

createSectionCounter(sections);