-- Safe Setup
CREATE TABLE IF NOT EXISTS site_content (
    id SERIAL PRIMARY KEY,
    section_name VARCHAR(50) UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed with ALL sections
INSERT INTO site_content (section_name, content) VALUES
('navigation', '{
    "logo": "WELDOSELD",
    "links": ["Home", "About", "Brands", "Products", "Videos", "Gallery", "Certifications", "Clients", "Contact"],
    "topBar": {
        "phone": "+61 8 0000 000", 
        "email": "info@weldoseld.com", 
        "address": "123 Safety Way, NY"
    }
}'),
('hero', '{
    "tagline": "WELCOME TO WELDOSELD",
    "title": "Protecting lives with trusted fire safety",
    "description": "Premium fire protection solutions for industrial and residential assets across the globe.",
    "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1000"
}'),
('about', '{
    "title": "Expert guidance and fire safety protection",
    "subtitle": "ABOUT OUR COMPANY",
    "description": "We specialize in high-end fire safety solutions, providing specialized consultancy and on-site engineering.",
    "experience": "30+",
    "image": "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
    "image2": "https://images.unsplash.com/photo-1599059021644-80252390a424?auto=format&fit=crop&q=80&w=400",
    "stats": [
        {"label": "Projects Completed", "value": "150+"},
        {"label": "Cities Covered", "value": "40+"},
        {"label": "Awards Won", "value": "25+"}
    ]
}'),
('services', '[
    {"title": "Fire Suppression", "description": "Automatic CO2 and clean agent systems for high-risk areas.", "icon": "Shield"},
    {"title": "Alarm Systems", "description": "Smart detection and notification systems for early warnings.", "icon": "Flame"},
    {"title": "Hydrant Systems", "description": "High-pressure water distribution for industrial complexes.", "icon": "Droplets"},
    {"title": "Safety Audits", "description": "Professional consultancy and thorough asset assessment.", "icon": "Search"}
]'),
('footer', '{
    "logo": "WELDOSELD",
    "description": "Premium fire protection solutions for industrial and residential assets. Engineered for ultimate protection.",
    "links": {
        "services": ["Fire Alarms", "Fire Suppression", "Fire Hydrants", "Safety Audits"]
    },
    "contact": {
        "address": "123 Safety Way, Industrial Zone, New York",
        "phone": "+61 8 0000 000",
        "email": "info@weldoseld.com"
    }
}'),
('gallery', '[
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1599059021644-80252390a424?w=500&h=500&fit=crop"
]'),
('brands', '[
    {"name": "FireGard Pro", "logo": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=100&fit=crop"},
    {"name": "SafeTech", "logo": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=100&fit=crop"}
]'),
('videos', '[
    {"title": "Fire Training", "thumb": "https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=800&h=450&fit=crop"},
    {"title": "Installation Guide", "thumb": "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?w=800&h=450&fit=crop"}
]'),
('features', '[
    {"title": "Custom Fire Protection Plans", "description": "Tailored fire safety solutions based on your property needs.", "image": "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"},
    {"title": "Advanced Fire Alarm Systems", "description": "State of the art fire alarm systems designed for early detection.", "image": "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=800"},
    {"title": "Evacuation Planning & Drills", "description": "We develop customized emergency evacuation plans.", "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800"}
]'),
('certs', '[
    {"title": "ISO 9001:2015", "issuer": "Quality Management System", "date": "Active"},
    {"title": "NFPA Certified", "issuer": "Fire Protection Assoc", "date": "Renewed"}
]'),
('clients', '[
    {"label": "Global Assets", "value": "47B+"},
    {"label": "Compliance Rate", "value": "90%+"}
]')
ON CONFLICT (section_name) DO NOTHING;
