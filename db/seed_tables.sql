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

create table backgrounds (
    id serial Primary KEY,
    category VARCHAR(10),
    name VARCHAR(20),
    price Int,
    selected Int DEFAULT 0,
    description TEXT
);


insert into backgrounds (category, name, price, description)
values ('Warrior', 'Solider', 20, 'The soldier is the rank and file member of any army. There he learns discipline, teamwork, and gun training. And at the end of it, you’ll get a solid gun and a solid set of armor to take home with you. Well, not REALLY, but at least, you get a snazzy uniform to show off./ Actually, what you end up with is up to you- Soldiers have the greatest range of things they can buy for a discounted price.'),
('Warrior', 'Captain', 25, 'The officers and higher ups of an army. They’re trained in bigger picture things and thus are a little weak when it comes to military training, but gain the skills needed to be effective leading men.'),
('Warrior', 'Slave', 30, 'Whether a Hiven slave or an indentured servant, a slave is a slave. Focusing on physical labor, slaves learn to work hard and push their bodies to the limit (or die trying). /Slaves get a range of skills based on what they were raised to do, giving them a good choice of skills to play with.'),
('Warrior', 'Mercenary', 25, 'Have gun, will travel. The mercenary is a man with an obvious price. Survival isn’t always about being faster than the other man but about being able to out maneuver him, either intellectually or physically. This background is built around surviving and having the wherewithal to stomach the pain and push on.'),
('Warrior', 'Ship Gunner', 25, 'Trained to work with the big weapons and sighting from a distance, the Ship’s Gunner trains to be able to hit a target while one or either is moving.'),
('Warrior', 'Sniper', 35, 'Lie in wait, line up the shot, fire. The Sniper takes intense training to be able to lie on your stomach and fire at your target from a safe distance, maximizing damage and trying to achieve one shot, one kill.'),
('Warrior', 'Brawler', 30, 'Some people just ignore the old adage “never bring a knife to a gunfight.” Brawlers are those ‘some people’. These are they that specialize in melee combat. Most often feral worlders who like their killing personal.'),
('Technician', 'Engineer', 25, 'An engineer is a man skilled in a certain discipline, most often designing and building things. He’s specializations can run a whole gamut of things, which is why he specializes in one of a huge host of skills. He also receives any of the prerequisites at the needed minimum.'),
('Technician', 'Pilot', 25, 'It takes more than just skill to be a pilot. It takes skill, smarts, and quick thinking to adapt to combat. It also takes leadership as the pilot needs to coordinate between the different rooms of the ship.'),
('Technician', 'Freelancer', 30, 'Freelancers are those engineers that never went to school but learned their skills in the Black. Thus, they’re the technician equivalent of the mercenary.'),
('Technician', 'Medic', 25, 'The difference between a medic and a doctor is that medic just makes you comfortable till you die. While that’s not entirely true, there’s a hint of truth to it. While highly trained, they’ve only mastered the basics of the doctoring profession. As such they tend to be cheaper.'),
('Technician', 'Scientist', 25, 'Scientists focus on having information at their fingertips and are the theoretical side of more practical engineering. Based more on the intellectual side of the pursuit of knowledge, they also receive any of the prerequisites at the needed minimum.'),
('Technician', 'Navigator', 25, 'While a pilot flies, the navigator tells him where to go, using Astrology, Astro-Mathematics, and a digital Astrolabe to chart a safe path through the cosmos. The navigator holds the crew’s life in their hands and risks it with each jump.'),
('Technician', 'Petty Criminal', 25, 'Even in the Void, there are those that have to result in less cerebral ways of gaining money. These are the pickpockets and thieves that form the backbone of any criminal organization. While not really tech savvy, their skillset still find uses in the Space Age.'),
('Technician', 'Mechanic', 25, 'He can’t build it, but he can fix it. A mechanic is a practical engineer who lives by the words “if it looks stupid but works, it ain’t stupid.” Mechanics have the abilities to repair anything you hand him, though he can’t tell you have it works.'),
('Diplomat', 'Noble/Pygmalion', 25, 'Leadership either gained through talent (Pygmalion) or through centuries of breeding and training (noble). This background represents the ideals of what it means to be a noble spirit.'),
('Diplomat', 'Smuggler', 20, 'The dashing rogue, thumbing their nose at authority, the smuggler takes the basic skills of the petty criminal and instead of using lockpicks to open doors, uses charm and winning smile, with a healthy side of stealth.'),
('Diplomat', 'Priest', 35, 'The champion of the gods, the priest combines the bearing and command of the noble with more practical skills making a valuable ally to have at your side, whether or not his god is truly with him.'),
('Diplomat', 'Charlatan', 25, 'The confidence men of the Void, they survive by the skin of their wit. Charlatans vary widely in their skill set, simply mastering any skills they need on the fly.'),
('Diplomat', 'Escort', 30, 'Who needs a gun when you’ve got charm? Who needs armor when you’ve disarmed your enemy? The escort may do dirty deeds, but he does it with grace.')
