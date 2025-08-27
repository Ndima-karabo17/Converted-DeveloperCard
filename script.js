function getItPlease() {
  fetch('http://localhost:3000/Developers')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched JSON data:', data);

      const developers = data.Developers || data;

      const manager = new DevCardManager(developers);
      manager.displayAllCards();
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}

getItPlease()
class DevCardManager {
  constructor(developers) {
    this.developers = developers;
    this.root = document.getElementById('root');

    if (!this.root) {
      console.warn('Root element not found!');
      return;
    }
  }

  createCardHTML(developer) {
    return `
      <div class="card ${developer.isActive ? 'active' : 'inactive'}">
        <img src="${developer.pictureUrl}" alt="${developer.username}" class="avatar">
        <h2>${developer.username}</h2>
        <p><strong>Experience:</strong> ${developer.yearsExperience} years</p>
        <p><strong>Status:</strong> ${developer.isActive ? 'Active' : 'Inactive'}</p>
        <p><strong>Email:</strong> ${developer.email}</p>
        <p><strong>Phone:</strong> ${developer.phone}</p>
        <p><strong>Skills:</strong> <span class="skills">${developer.skills.map(skill => `<span>${skill}</span>`).join('')}</span></p>
        <p class="bio">${developer.bio}</p>
      </div>
    `;
  }

  displayAllCards() {
    const cardsHTML = this.developers.map(dev => this.createCardHTML(dev)).join('');
    this.root.innerHTML = cardsHTML;
  }
}

