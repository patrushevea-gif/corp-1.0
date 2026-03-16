const sources = {
  international: [
    {
      title: 'OpenSanctions',
      description: 'Глобальная открытая база санкционных списков и PEP.',
      buildUrl: (query) => `https://www.opensanctions.org/search/?q=${query}`,
    },
    {
      title: 'OFAC Sanctions List Search (США)',
      description: 'Поиск по санкционным спискам OFAC (SDN и др.).',
      buildUrl: (query) => `https://sanctionssearch.ofac.treas.gov/?q=${query}`,
    },
    {
      title: 'UK OFSI Consolidated List',
      description: 'Консолидированный санкционный список Великобритании.',
      buildUrl: (query) =>
        `https://www.gov.uk/government/publications/the-uk-sanctions-list?q=${query}`,
    },
    {
      title: 'EU Sanctions Map',
      description: 'Санкционные меры Европейского союза.',
      buildUrl: (query) =>
        `https://www.sanctionsmap.eu/#/main?keywords=${query}`,
    },
    {
      title: 'UN Security Council Sanctions',
      description: 'Материалы Совбеза ООН по санкциям и связанным спискам.',
      buildUrl: (query) =>
        `https://main.un.org/securitycouncil/en/sanctions/information?search=${query}`,
    },
  ],
  russian: [
    {
      title: 'Росфинмониторинг: Перечни',
      description:
        'Перечни организаций и физических лиц, причастных к терроризму/экстремизму и иным рискам.',
      buildUrl: (query) =>
        `https://www.fedsfm.ru/documents/terrorists-catalog-portal-act?query=${query}`,
    },
    {
      title: 'Банк России: противодействие легализации доходов',
      description:
        'Публикации и нормативные материалы Банка России в части ПОД/ФТ и санкционных требований.',
      buildUrl: (query) =>
        `https://cbr.ru/search/?text=${query}%20%D1%81%D0%B0%D0%BD%D0%BA%D1%86%D0%B8%D0%B8`,
    },
    {
      title: 'Правительство РФ: специальные экономические меры',
      description:
        'Официальные документы РФ по специальным экономическим мерам и ограничениям.',
      buildUrl: (query) =>
        `http://government.ru/search/?text=${query}%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D1%8D%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%80%D1%8B`,
    },
  ],
};

const entityInput = document.getElementById('entityInput');
const generateButton = document.getElementById('generateButton');
const validationMessage = document.getElementById('validationMessage');
const internationalList = document.getElementById('internationalList');
const russianList = document.getElementById('russianList');

const renderList = (listElement, items, rawQuery) => {
  const query = encodeURIComponent(rawQuery.trim());
  listElement.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'link-item';

    const link = document.createElement('a');
    link.href = item.buildUrl(query);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    li.append(link, description);
    listElement.appendChild(li);
  });
};

const buildLinks = () => {
  const value = entityInput.value.trim();

  if (!value) {
    validationMessage.textContent = 'Введите ИНН или название компании.';
    internationalList.innerHTML = '';
    russianList.innerHTML = '';
    return;
  }

  validationMessage.textContent = '';
  renderList(internationalList, sources.international, value);
  renderList(russianList, sources.russian, value);
};

generateButton.addEventListener('click', buildLinks);
entityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    buildLinks();
  }
});
