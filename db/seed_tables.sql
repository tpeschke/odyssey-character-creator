create table users (
    id serial Primary KEY,
    user_name VARCHAR(40),
    auth_id TEXT
);

create table aliens (
    id serial Primary KEY,
    species VARCHAR(40),
    selected Int DEFAULT 0,
    description TEXT
);

insert into aliens (species, description)
values ('Akehlarian', 'One from many, the Akehlarians are a colony of spores that come together in a hive mind to create one consciousness. Because of this, they are adept at learning and growing. They’re also able to shed their spores, creating new Akehlarians, splitting themselves into multiple beings./Akehlarians are born into a singularity and only through experiences do they gain their individuality, forcing themselves to face different ways of dealing with the universe. Many people suffer from being of two minds about a subject: Akehlarians must face being one thousand minds about a given subject.'), 
('Clone', 'Living copies of organic beings, clones are manufactured and designed for a specific purpose. Their lives tend to be brutal and short, however, they’re survivors, fitted to survive./Clones are treated as property by humans and Hivens, but they’ve found unlikely friends with Senties.'), 
('Droid', 'Also called Senties, these robotic beings are those with a learning program that have ‘woken up’, gaining an amount of self-awareness. Droids often struggle with their newfound cognition. While Humans fight over the meaning of their existence, a Droid fights to reconcile the urge to fulfill their original programing, be that moving shipping containers or serving drinks, with their newfound sentience./Droids often scorn organics, but some choose to observe them to understand the curse of sentience.'), 
('Ghost', 'Bioelectric shadows, these mysterious beings earn their name by their physical appearance: translucent humanoid beings made of energy./Beings made of energy, Ghosts are able to pass through solid matter, directly interface with electronics, and draining life force from organic beings./While humanoid in shape, that’s the only thing that is the only similarity appearance wise they are a mass of energy rolling and crashing into itself, like fireworks in slow motion. Quite beautiful, they often evoking awe or terror, like the colliding of alien waves on a strange beach./These wayfarers roam the Galaxy trying to find meaning. Ghosts phase into existence, with little to no recollection of any past. Having no ties, they are nomadic in nature. They often find homes among Hivens or Humans, depending on their disposition, though some have scorned their reliance on others. They slowly die around Droids.'), 
('Human', 'The descendants of the original Earthlings, these have taken to the stars after ruining their Home World. They make up the second most populous species and have flourished by being the most adaptive of the races, enhancing their weaknesses with technology./Humans dislike Hivens and exploit them by manufacturing Chems, drugs that enhance abilities. Hivens find these particularly addicting. '), 
('Hiven', 'Great insectoid beings that live and die for their hive. Hiven genetics are carefully managed according to Caste being differentiated according to the needs of the Queen./Hivens are warlike and straightforward, which is both a blessing and a curse. Hiven culture is diffused across the Void, broken into feuding hives led by Queens that recognize no sovereignty but their own. This often causes other species to get swept up in their bloody wars.');
