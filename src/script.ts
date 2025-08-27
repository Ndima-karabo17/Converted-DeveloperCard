interface Developer {
  username: string;
  yearsExperience: number;
  isActive: boolean;
  email: string;
  phone: string;
  skills: string[];
  bio: string;
  pictureUrl: string;
}


class DevCardManager {
  private developers: Developer[];
  private root: HTMLElement | null;

  constructor(developers: Developer[]) {
    this.developers = developers;
    this.root = document.getElementById('root');

    if (!this.root) {
      console.warn('Root element not found!');
    }
  }

  private createCardHTML(developer: Developer): string {
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

  public displayAllCards(): void {
    if (!this.root) return;
    const cardsHTML = this.developers.map(dev => this.createCardHTML(dev)).join('');
    this.root.innerHTML = cardsHTML;
  }
}


function getItPlease(): void {
  fetch('http://localhost:3000/Developers')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: any) => {
      console.log('Fetched JSON data:', data);

 
      const developers: Developer[] = data.Developers || data;

      const manager = new DevCardManager(developers);
      manager.displayAllCards();
    })
    .catch((error: Error) => {
      console.error('Error fetching JSON:', error);
    });
}

getItPlease();
