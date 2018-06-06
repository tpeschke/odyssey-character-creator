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

create table talents (
    id serial Primary KEY,
    name VARCHAR(50),
    price Int,
    selected Int DEFAULT 0,
    multi BOOLEAN default false,
    description TEXT
);

insert into talents (name, price)
values ('Ambidextrous', 15), ('Animal Magnetism', 15), ('Astute Observation', 20), ('Black-Thumb', 20), ('Blind-Fighting', 40), ('Blind-Shooting', 40),('Brutal', 15), ('Bulking', 10),('Chem Adept', 15), 
('Combat Reflexes', 20), ('Courage', 20), ('Damage Bonus', 10), ('Deadeye', 35), ('Endurance', 15), ('Fan Firing', 15), ('Fast Healing', 10), ('Favored Firearm', 15), ('Fleet-Footed', 20), 
('Forgettable Face', 20), ('Greased Lightning', 10), ('Guardian Angel', 20), ('Grounded Mind', 35), ('Heavy Lifter', 15), ('Heightened Immunity', 10), ('Hip Shooting', 20), ('Hit Point Bonus', 20),
('Improved Acceleration', 10), ('Improved Arc of Fire', 25), ('Improved Defense', 15), ('Improved Reach', 15), ('Inheritance', 5), ('Inoculation', 3), ('Knack', 25), ('Lead Hide', 40), ('Less Sleep', 24),
('Long Distance Running', 10), ('Military Training', 20), ('Notoriety', 5), ('One-Upmanship', 10), ('Opportunist [Attack]', 30), ('Opportunist [Defense]', 30), ('Pain Tolerant', 20), ('Parvenu', 25),
('Precision Shot', 25), ('Poison Resistant', 4), ('Polygot', 10), ('Point Black Shot', 25), ('Precision Aiming', 10), ('Precision Combatant', 12), ('Prodigy', 10), ('Photographic Memory', 20), ('Quick Aim', 15),
('Rapid Reload', 20), ('Resolute', 20), ('Shoot on the Run', 5), ('Skill Savant', 30), ('Spry', 10), ('Stout', 20), ('Terran Windage', 15), ('Tough as Nails', 20), ('Tough Hide', 40), ('Tumbler', 10), 
('True Grit', 25), ('Vehicular Combatant', 5), ('Vetern Gunfighter', 5), ('Voidborn', 25), ('Weight Control', 10)

create table proficiencies (
    id serial Primary KEY,
    name VARCHAR(50),
    price Int,
    selected Int DEFAULT 0,
    multi BOOLEAN,
    description TEXT
);

create table proficReq (
    id serial Primary KEY,
    name VARCHAR(50),
    score Int,
    proficId Int,
    type VARCHAR(20),
    FOREIGN key (proficId) references proficiencies(id)
)

insert into proficiencies (name, price, multi)
values ('Armor', 6, false), ('Bilingual', 5, true), ('Butcher', 3, false), ('Etiquette/Manners [Specific Culture]', 5, true), 
('Hiking/Road Marching', 4, false), ('Labourer', 1, false), ('Maintance/Upkeep', 5, false), ('Mason', 8, false), 
('Pygmalion', 10, false), ('Radio Operation', 3, false), ('Shield', 6, false), ('Skinning/Tanning', 2, false), 
('Style Sense', 2, false), ('Taxidermy', 4, false)

insert into proficReq (name, score, proficId, type)
values ('CON', 11, 5, 'score'), ('Mining', 25, 8, 'skill'), ('Etiquette/Manners', 0, 9, 'profic'), ('Skinning/Tanning', 0, 14, 'profic'), ('Carpentry', 25, 14, 'skill'), 
('Leatherworking', 50, 14, 'skill')

create table qftables (
    id serial primary key,
    name VARCHAR(40),
    rangeStart int,
    rangeEnd int
)

insert into qftables (name, rangeStart, rangeEnd)
values ('Mental Quirks', 1, 6), ('Behavioral Quirks', 7, 14), ('Physical Flaws', 15, 20)

create table mentalQuirks (
    id serial primary key,
    name VARCHAR(40),
    rangeStart Int,
    rangeEnd Int,
    selected Int DEFAULT 0,
    description Text,
    bp Int
)

insert into mentalQuirks (name, rangestart, rangeend, bp)
values ('Ambivalent', 1,31,5), ('Inappropriate Sense of Humor', 32,62, 5), ('Depression (minor)', 63,91,10), ('Hardcase', 92,120,10),
('Quirk-Tempered', 121, 149,10), ('Kleptomaniac', 150,178,13),('Agoraphobia', 179,206,15), ('Gynophobia', 207,234,15),
('Chauvinist',235,262,15), ('Nagging Conscience',263,290,15), ('Superstitious',291,318,15), ('Touchy', 319,346, 15),
('Chronic Nightmares', 347,374, 18), ('Chivalrous', 375,400, 20),('Claustrophobia (minor)', 401,426, 20), ('Clingy', 427,452,20),
('Delusional (minor)', 453, 478, 20),('Depression (major)',479,503,20),('Junkie',504,528,20), ('Ornery', 529,553,20), 
('Lusty',554,578,20),('Short Term Memory Loss', 579,603,20), ('Space Case', 604,628,20),('Spendthrift',629,653,20), 
('Overconfident',654,676,21),('HackLust',677,699,22), ('HackFrenzy',700,722,24), ('Aversion to Alien Species', 723,745,25),
('Aversion to Profession', 746,768,25), ('Hoarder', 769,791,25), ('Paranoid', 792,814,25), ('Sadistic', 815,837,25), 
('Acrophobia', 838,859,30),('Professionist', 860,881,30), ('Claustrophobia (major)', 882,899,35),('Obessive Complusive', 900,917,25), 
('Delusional (major)', 918,934,40),('Fanatic', 935,951, 40), ('Pyromaniac', 952,968,40), ('Xenophobia', 969,985,40), 
('Neurotic', 986, 1000,45);

create table physicalQuirks (
    id serial primary key,
    name VARCHAR(40),
    rangeStart Int,
    rangeEnd Int,
    selected Int DEFAULT 0,
    description Text,
    bp Int
)

insert into physicalQuirks (name, rangestart, rangeend, bp)
values ('Hairy', 1,27,5), ('Limp, Slight', 28,54,5), ('Sterile', 55,81,5),('Tone Deaf', 82,108,5),('Weary', 109,135,8),('Anosmia', 136,160,10),('Colorblind', 161,185,10),('Limp, Moderate',186,209,10),
('Albino', 210,233,15),('Allergies', 234,257,15), ('Hearing Impaired', 258,281,15), ('Missing Ear', 282,305,15), ('Pestilent', 306,329,15),('Sound Sleeper', 330,353,15),('Glass Jaw', 354,377,15),
('Asthmatic',378,398,20),('Doppelganger',399,419,20),('Impotent',420,440,20),('Nervous Tic',441,461,20),('Pocking',462,482,20),('Strange Body Odor',483,503,20),('Faulty Prosthetic',504,524,20),
('Sleepwalker',525,546,20),('Wasting Disease',547,568,20),('Weakling',569,589,20),('Scar, Facial',590,610,0),('Stutterer',611,631,24),('Lisp',632,652,25),('Presbyopic',653,673,25),('Limp, Severe',674,694,25),
('Mute',695,715,25),('Migraines',716,734,30),('Space Sick',735,753,30),('Trick Knee',754,772,30),('Myopia',773,791,30),('Accident Prone',792,810,30),('Missing Digit',811,827,0),('Unusual Diet',824,844,35),
('Hemophilic',845,861,35),('No Depth Perception',862,878,35),('Low Pain Tolerance',789,895,35),('Feeble',896,912,35),('Severly Maimed',913,927,0),('Missing Eye',928,940,40),('Blind, One Eye',941,953,40),
('Deaf',954,966,40),('Epileptic',967,979,40),('Missing Limb',980,990,0),('Blind',991,1000,60)

create table behavioralQuirks (
    id serial primary key,
    name VARCHAR(40),
    rangeStart Int,
    rangeEnd Int,
    selected Int DEFAULT 0,
    description Text,
    bp Int
)

