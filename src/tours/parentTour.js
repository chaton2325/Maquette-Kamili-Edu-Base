export const parentTour = [
  {
    route: { name: 'parent-dashboard' },
    title: 'Bienvenue sur Kamili Éduc',
    text: 'Petite visite guidée de l’espace Parent : inscription, notes, scolarité, APE... Vous pouvez la fermer à tout moment.'
  },
  {
    route: { name: 'parent-dashboard' },
    target: 'summary-children',
    title: 'Vos enfants en un coup d’œil',
    text: 'Retrouvez ici le statut de scolarité de chaque enfant et les échéances à venir.'
  },
  {
    route: { name: 'parent-dashboard' },
    target: 'nav-children',
    title: 'Mes enfants',
    text: 'Gérez la fiche de chaque enfant : profil, notes, emploi du temps et paiements.'
  },
  {
    route: { name: 'parent-children' },
    target: 'enroll-button',
    title: 'Inscrire un enfant',
    text: 'Un assistant vous guide pas à pas pour inscrire un enfant dans un établissement.'
  },
  {
    route: { name: 'parent-child-detail', params: { id: 'c-001' } },
    target: 'child-tabs',
    title: 'Fiche élève',
    text: 'Notes & bulletins, emploi du temps et paiements de l’enfant, réunis au même endroit.'
  },
  {
    route: { name: 'parent-dashboard' },
    target: 'nav-scolarite',
    title: 'Scolarité',
    text: 'Suivez l’échéancier des frais et payez en Mobile Money en quelques clics.'
  },
  {
    route: { name: 'parent-ape' },
    target: 'ape-tabs',
    title: 'Association des Parents d’Élèves',
    text: 'Payez votre cotisation APE et suivez les projets construits grâce à ces cotisations.'
  },
  {
    route: { name: 'parent-dashboard' },
    target: 'nav-more',
    title: 'Annonces & profil',
    text: 'Retrouvez les annonces de l’école et du ministère, ainsi que votre profil, ici.'
  }
]
