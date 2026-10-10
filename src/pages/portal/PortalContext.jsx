import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProjectsData from '../../data/studioProjectsData.json';

const PortalContext = createContext();

export function PortalProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('sira_studio_projects_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading projects from localStorage', e);
    }
    return initialProjectsData;
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    return projects[0]?.id || 'marula-siddappa-residence';
  });

  const [activeTab, setActiveTab] = useState('quotation'); // 'dashboard', 'quotation', 'proposal', 'vault', 'importer', 'library'

  // Persist to localStorage whenever projects state changes
  useEffect(() => {
    try {
      localStorage.setItem('sira_studio_projects_v3', JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage', e);
    }
  }, [projects]);

  const activeProject = (projects && projects.length > 0)
    ? (projects.find(p => p.id === activeProjectId) || projects[0])
    : initialProjectsData[0];

  // Helper to recalculate floor and project totals
  const recalculateProjectTotals = (project) => {
    let grandTotal = 0;
    const updatedFloors = (project.floors || []).map(floor => {
      let floorSum = 0;
      const updatedAreas = (floor.areas || []).map(area => {
        const updatedItems = (area.items || []).map(item => {
          let sft = item.sft;
          if ((!sft || sft === 0) && item.width && item.height) {
            sft = Number(((item.width * item.height) / 144).toFixed(2));
          }
          let itemTotal = item.total;
          if (item.rate && (item.qty || item.qty === 0)) {
            if (sft && sft > 0) {
              itemTotal = Number((sft * item.rate * item.qty).toFixed(2));
            } else {
              itemTotal = Number((item.rate * item.qty).toFixed(2));
            }
          }
          floorSum += (itemTotal || 0);
          return { ...item, sft: sft || item.sft, total: itemTotal || item.total };
        });
        return { ...area, items: updatedItems };
      });
      grandTotal += floorSum;
      return { ...floor, areas: updatedAreas, floorTotal: Number(floorSum.toFixed(2)) };
    });

    const discountAmount = Number(((grandTotal * (project.discountPercent || 0)) / 100).toFixed(2));
    const taxableAmount = grandTotal - discountAmount;
    const gstAmount = Number(((taxableAmount * (project.taxGstPercent || 0)) / 100).toFixed(2));
    const finalAmount = Number((taxableAmount + gstAmount).toFixed(2));

    return {
      ...project,
      floors: updatedFloors,
      subtotalAmount: Number(grandTotal.toFixed(2)),
      discountAmount,
      taxableAmount,
      gstAmount,
      grandTotal: finalAmount
    };
  };

  // Update whole project
  const updateProject = (projectId, updater) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updated = typeof updater === 'function' ? updater(p) : { ...p, ...updater };
      return recalculateProjectTotals(updated);
    }));
  };

  // Add Item to a specific area
  const addItemToArea = (projectId, floorIdx, areaIdx, newItem) => {
    updateProject(projectId, project => {
      const floors = [...project.floors];
      const targetArea = floors[floorIdx].areas[areaIdx];
      const sft = (newItem.width && newItem.height) ? Number(((newItem.width * newItem.height) / 144).toFixed(2)) : (newItem.sft || 0);
      const total = sft > 0 
        ? Number((sft * (newItem.rate || 0) * (newItem.qty || 1)).toFixed(2))
        : Number(((newItem.rate || 0) * (newItem.qty || 1)).toFixed(2));

      targetArea.items = [
        ...targetArea.items,
        { ...newItem, sft, total }
      ];
      return { ...project, floors };
    });
  };

  // Update single item
  const updateItemInArea = (projectId, floorIdx, areaIdx, itemIdx, updatedItem) => {
    updateProject(projectId, project => {
      const floors = [...project.floors];
      const items = [...floors[floorIdx].areas[areaIdx].items];
      
      const sft = (updatedItem.width && updatedItem.height) 
        ? Number(((updatedItem.width * updatedItem.height) / 144).toFixed(2)) 
        : (updatedItem.sft || 0);
      const total = sft > 0 
        ? Number((sft * (updatedItem.rate || 0) * (updatedItem.qty || 1)).toFixed(2))
        : Number(((updatedItem.rate || 0) * (updatedItem.qty || 1)).toFixed(2));

      items[itemIdx] = { ...updatedItem, sft, total };
      floors[floorIdx].areas[areaIdx].items = items;
      return { ...project, floors };
    });
  };

  // Delete item
  const deleteItemFromArea = (projectId, floorIdx, areaIdx, itemIdx) => {
    updateProject(projectId, project => {
      const floors = [...project.floors];
      floors[floorIdx].areas[areaIdx].items = floors[floorIdx].areas[areaIdx].items.filter((_, idx) => idx !== itemIdx);
      return { ...project, floors };
    });
  };

  // Add new Floor
  const addFloor = (projectId, floorName) => {
    updateProject(projectId, project => {
      return {
        ...project,
        floors: [
          ...project.floors,
          { name: floorName, areas: [{ name: 'General', items: [] }], floorTotal: 0 }
        ]
      };
    });
  };

  // Add new Area to Floor
  const addAreaToFloor = (projectId, floorIdx, areaName) => {
    updateProject(projectId, project => {
      const floors = [...project.floors];
      floors[floorIdx].areas = [
        ...floors[floorIdx].areas,
        { name: areaName, items: [] }
      ];
      return { ...project, floors };
    });
  };

  // Update cover image for Area / Room
  const updateAreaCoverImage = (projectId, floorIdx, areaIdx, imageUrl) => {
    updateProject(projectId, project => {
      const floors = [...project.floors];
      floors[floorIdx].areas[areaIdx].coverImage = imageUrl;
      return { ...project, floors };
    });
  };

  // Add document to project vault
  const addDocument = (projectId, newDoc) => {
    updateProject(projectId, project => {
      return {
        ...project,
        documents: [
          newDoc,
          ...(project.documents || [])
        ]
      };
    });
  };

  // Delete document
  const deleteDocument = (projectId, docId) => {
    updateProject(projectId, project => {
      return {
        ...project,
        documents: (project.documents || []).filter(d => d.id !== docId)
      };
    });
  };

  // Update status (e.g. Approved, In Execution)
  const updateStatus = (projectId, status) => {
    updateProject(projectId, project => ({
      ...project,
      status,
      approvedAt: status === 'Approved' ? new Date().toISOString() : project.approvedAt
    }));
  };

  // Create new project
  const createNewProject = (newProj) => {
    const id = newProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const enriched = recalculateProjectTotals({
      id,
      title: newProj.title,
      clientName: newProj.clientName,
      clientPhone: newProj.clientPhone || '',
      clientEmail: newProj.clientEmail || '',
      location: newProj.location || 'Bengaluru',
      projectType: newProj.projectType || 'Interior Architecture',
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Draft',
      discountPercent: 0,
      taxGstPercent: 18,
      floors: [
        {
          name: 'Ground Floor',
          floorTotal: 0,
          areas: [{ name: 'Living & Dining', items: [] }]
        }
      ],
      documents: []
    });
    setProjects(prev => [enriched, ...prev]);
    setActiveProjectId(id);
    return id;
  };

  // Reset to default
  const resetToDefault = () => {
    setProjects(initialProjectsData);
    setActiveProjectId('marula-siddappa-residence');
    localStorage.removeItem('sira_studio_projects_v1');
  };

  return (
    <PortalContext.Provider value={{
      projects,
      activeProjectId,
      setActiveProjectId,
      activeProject: recalculateProjectTotals(activeProject),
      activeTab,
      setActiveTab,
      updateProject,
      addItemToArea,
      updateItemInArea,
      deleteItemFromArea,
      addFloor,
      addAreaToFloor,
      updateAreaCoverImage,
      addDocument,
      deleteDocument,
      updateStatus,
      createNewProject,
      resetToDefault
    }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
