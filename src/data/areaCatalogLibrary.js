// Master Area Catalog & Specifications Preset Library for Sira Space
// Derived from real-world Google Sheets quotations & architectural millwork standards.
// Hierarchy: Area -> Item -> Description / Sub-item -> Material Specifications, Dimensions & Rates.

export const DEFAULT_MASTER_LIBRARY = {
  Living: {
    title: 'Living Hall & Foyer Specifications',
    defaultImage: '/reference_images/image12.png',
    items: {
      "TV unit": {
        descriptions: {
          "Back panel": {
            materials: [
              "MR ply boxing + laminate",
              "MR ply + Charcoal Panel",
              "MR ply + External laminate",
              "MR ply + Laminate + Charcoal panels",
              "HDHMR board + CNC carving + PU paint",
              "Customised Wallpaper"
            ],
            defaultMaterial: "MR ply boxing + laminate",
            defaultW: 70, defaultD: 0, defaultH: 105, defaultRate: 800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Tall cabinet": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: Black Aluminium profile + glass",
              "Shelves : MR ply + laminate\nBack Panel : MR ply + Laminate\nVertical panels : Double ply MR ply + laminate"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: Black Aluminium profile + glass",
            defaultW: 24, defaultD: 18, defaultH: 105, defaultRate: 1300, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Drawer top panel": {
            materials: [
              "MR ply + Laminate",
              "MR ply + external Laminate"
            ],
            defaultMaterial: "MR ply + Laminate",
            defaultW: 118, defaultD: 17, defaultH: 14, defaultRate: 800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Drawer unit": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate / aluminium profiles + glass",
              "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass and Block board + laminate",
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate / aluminium profiles + glass",
            defaultW: 118, defaultD: 17, defaultH: 14, defaultRate: 1300, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Rafters": {
            materials: [
              "MR ply + Charcoal Panel",
              "MR ply + Laminate + charcoal panels",
              "MR ply backing + Charcoal panel"
            ],
            defaultMaterial: "MR ply + Charcoal Panel",
            defaultW: 24, defaultD: 0, defaultH: 105, defaultRate: 800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Vertical curve design": {
            materials: [
              "Aluminium channels + MR ply + Gypsum board + POP + Royale paint"
            ],
            defaultMaterial: "Aluminium channels + MR ply + Gypsum board + POP + Royale paint",
            defaultW: 16, defaultD: 0, defaultH: 119, defaultRate: 750, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Concealed swing door": {
            materials: [
              "Flush door + MR ply + Laminate + Door closer"
            ],
            defaultMaterial: "Flush door + MR ply + Laminate + Door closer",
            defaultW: 36, defaultD: 0, defaultH: 119, defaultRate: 1200, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Customised Wallpaper": {
            materials: [
              "Customised Wallpaper",
              "3D texture wallpaper"
            ],
            defaultMaterial: "Customised Wallpaper",
            defaultW: 84, defaultD: 0, defaultH: 96, defaultRate: 120, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Wall Panelling": {
        descriptions: {
          "Natural Oak Veneer Panelling": {
            materials: [
              "BWP Marine Ply + Natural White Oak Veneer + PU Polish",
              "MR ply + Natural Teak Veneer + Melamine Polish"
            ],
            defaultMaterial: "BWP Marine Ply + Natural White Oak Veneer + PU Polish",
            defaultW: 120, defaultD: 4, defaultH: 108, defaultRate: 2100, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Charcoal Louver Rafters": {
            materials: [
              "MR ply backing + Charcoal panels + LED profile grooves"
            ],
            defaultMaterial: "MR ply backing + Charcoal panels + LED profile grooves",
            defaultW: 84, defaultD: 2, defaultH: 108, defaultRate: 1200, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Seater": {
        descriptions: {
          "Seater with storage": {
            materials: [
              "MR ply + external Laminate",
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "MR ply + external Laminate",
            defaultW: 60, defaultD: 24, defaultH: 18, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Cushion": {
            materials: [
              "40 D Foam + fabric/leatherite\nAs per actuals"
            ],
            defaultMaterial: "40 D Foam + fabric/leatherite\nAs per actuals",
            defaultW: 60, defaultD: 24, defaultH: 4, defaultRate: 850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Book shelf": {
        descriptions: {
          "Book shelf display": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
              "MR ply + Laminate with LED strip lighting"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
            defaultW: 48, defaultD: 14, defaultH: 72, defaultRate: 1900, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  Foyer: {
    title: 'Foyer & Entrance Specifications',
    defaultImage: '/reference_images/image12.png',
    items: {
      "Basavanna Wall": {
        descriptions: {
          "Wallpaper": {
            materials: [
              "Customised Wallpaper",
              "3D Architectural Wall Mural"
            ],
            defaultMaterial: "Customised Wallpaper",
            defaultW: 65, defaultD: 0, defaultH: 120, defaultRate: 120, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Back panel": {
            materials: [
              "MR ply + External laminate + Charcoal panels",
              "BWR ply + External laminate"
            ],
            defaultMaterial: "MR ply + External laminate + Charcoal panels",
            defaultW: 63, defaultD: 0, defaultH: 111, defaultRate: 1200, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Seater - 1": {
        descriptions: {
          "Seater with storage": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 66, defaultD: 18, defaultH: 18, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Cushion": {
            materials: [
              "40 D Foam + fabric/leatherite\nAs per actuals"
            ],
            defaultMaterial: "40 D Foam + fabric/leatherite\nAs per actuals",
            defaultW: 66, defaultD: 18, defaultH: 4, defaultRate: 850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "UPS unit": {
        descriptions: {
          "UPS storage cabinet": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 38, defaultD: 18, defaultH: 36, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Planter box": {
        descriptions: {
          "Planter box": {
            materials: [
              "BWR ply + External laminate",
              "Marine 710 ply with waterproof FRP lining"
            ],
            defaultMaterial: "BWR ply + External laminate",
            defaultW: 60, defaultD: 18, defaultH: 18, defaultRate: 1500, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Shoe rack": {
        descriptions: {
          "Shoe rack with louvered shutters": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Louvered shutters + laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Louvered shutters + laminate",
            defaultW: 48, defaultD: 15, defaultH: 40, defaultRate: 1600, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  "Pooja room": {
    title: 'Pooja Room Mandir Specifications',
    defaultImage: '/reference_images/image12.png',
    items: {
      "Pooja room": {
        descriptions: {
          "Pooja panelling - front": {
            materials: [
              "MR ply + external laminate",
              "BWP Marine Ply + Teak Veneer + PU Polish"
            ],
            defaultMaterial: "MR ply + external laminate",
            defaultW: 11, defaultD: 0, defaultH: 84, defaultRate: 850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Pooja elevation": {
            materials: [
              "Pooja boxing + Veneer + Polishing"
            ],
            defaultMaterial: "Pooja boxing + Veneer + Polishing",
            defaultW: 60, defaultD: 18, defaultH: 96, defaultRate: 1650, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Pooja gopura": {
            materials: [
              "Ply framing + external Laminate",
              "Teakwood traditional carved gopuram"
            ],
            defaultMaterial: "Ply framing + external Laminate",
            defaultW: 48, defaultD: 18, defaultH: 36, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Pooja top glass": {
            materials: [
              "10mm toughened glass"
            ],
            defaultMaterial: "10mm toughened glass",
            defaultW: 52, defaultD: 32, defaultH: 0, defaultRate: 350, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Open shelves": {
            materials: [
              "MR ply + external laminate"
            ],
            defaultMaterial: "MR ply + external laminate",
            defaultW: 12, defaultD: 6, defaultH: 0, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Back CNC": {
            materials: [
              "Corian sheet + CNC + ply framing",
              "Backlit acrylic CNC jaali panel"
            ],
            defaultMaterial: "Corian sheet + CNC + ply framing",
            defaultW: 48, defaultD: 0, defaultH: 72, defaultRate: 1800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Cove boxing around wallpaper": {
            materials: [
              "Ply framing + external Laminate"
            ],
            defaultMaterial: "Ply framing + external Laminate",
            defaultW: 48, defaultD: 0, defaultH: 84, defaultRate: 850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  Dining: {
    title: 'Dining Room & Crockery Specifications',
    defaultImage: '/reference_images/image12.png',
    items: {
      "Crockery unit": {
        descriptions: {
          "Crockery unit display": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
              "MR ply boxing + Shelves with MS rods and powdercoating + Brown mirror"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
            defaultW: 36, defaultD: 16, defaultH: 83, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Base cabinet": {
            materials: [
              "Carcass : BWP ply + internal laminate\nShutter: HDHMR + external glossy laminate\nHandle : G profile",
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass : BWP ply + internal laminate\nShutter: HDHMR + external glossy laminate\nHandle : G profile",
            defaultW: 75, defaultD: 18, defaultH: 30, defaultRate: 1800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Open shelving tall unit": {
            materials: [
              "MR ply + external laminate + charcoal panel"
            ],
            defaultMaterial: "MR ply + external laminate + charcoal panel",
            defaultW: 24, defaultD: 14, defaultH: 83, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Overhead Cabinet": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
            defaultW: 37, defaultD: 14, defaultH: 29, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Rafters": {
            materials: [
              "MR ply backing + Charcoal panel"
            ],
            defaultMaterial: "MR ply backing + Charcoal panel",
            defaultW: 12, defaultD: 0, defaultH: 119, defaultRate: 1050, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Tandem box": {
            materials: [
              "Brand : Hettich"
            ],
            defaultMaterial: "Brand : Hettich",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 10000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Wash basin": {
        descriptions: {
          "Storage vanity": {
            materials: [
              "Carcass: BWP ply + internal laminate\nShutter: HDHMR + external laminate"
            ],
            defaultMaterial: "Carcass: BWP ply + internal laminate\nShutter: HDHMR + external laminate",
            defaultW: 36, defaultD: 18, defaultH: 20, defaultRate: 2500, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Mirror": {
            materials: [
              "12mm ply backing + mirror",
              "LED vanity touch mirror"
            ],
            defaultMaterial: "12mm ply backing + mirror",
            defaultW: 27, defaultD: 0, defaultH: 34, defaultRate: 700, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Diamond mirror for dado": {
            materials: [
              "12mm ply backing + mirror"
            ],
            defaultMaterial: "12mm ply backing + mirror",
            defaultW: 37, defaultD: 0, defaultH: 24, defaultRate: 800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  Kitchen: {
    title: 'Kitchen & Modular Pantry Specifications',
    defaultImage: '/reference_images/image22.png',
    items: {
      "Base cabinet": {
        descriptions: {
          "Modular Base Cabinet with Sink & Hob": {
            materials: [
              "Carcass : BWP ply + internal laminate\nShutter: HDHMR + external acrylic sheet\nHandle : Gola profile",
              "Carcass : BWP ply + internal laminate\nShutter: HDHMR + external glossy laminate\nHandle : G profile"
            ],
            defaultMaterial: "Carcass : BWP ply + internal laminate\nShutter: HDHMR + external acrylic sheet\nHandle : Gola profile",
            defaultW: 184, defaultD: 24, defaultH: 36, defaultRate: 2350, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      },
      "Overhead cabinet": {
        descriptions: {
          "Fluted Glass Shutter Overhead Cabinet": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
              "Carcass: MR ply + internal laminate\nShutter: Aluminium profile + Fluted Glass"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass",
            defaultW: 71, defaultD: 12, defaultH: 26, defaultRate: 1500, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      },
      "Loft": {
        descriptions: {
          "Full-Span Kitchen Loft": {
            materials: [
              "Ply framing: MR ply + internal laminate\nShutter: MDF + Acrylic sheet",
              "Ply framing: MR ply + internal laminate\nShutter: HDHMR + external acrylic sheet"
            ],
            defaultMaterial: "Ply framing: MR ply + internal laminate\nShutter: MDF + Acrylic sheet",
            defaultW: 224, defaultD: 24, defaultH: 28, defaultRate: 1700, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      },
      "Tall unit": {
        descriptions: {
          "Pantry & Appliance Tall Unit": {
            materials: [
              "Carcass: BWP ply + internal laminate\nShutter: HDHMR + Acrylic sheet",
              "Carcass : BWP ply + internal laminate\nShutter: HDHMR + external acrylic sheet\nHandle : Gola profile"
            ],
            defaultMaterial: "Carcass: BWP ply + internal laminate\nShutter: HDHMR + Acrylic sheet",
            defaultW: 24, defaultD: 24, defaultH: 84, defaultRate: 2350, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      },
      "Breakfast counter": {
        descriptions: {
          "L shape Panelling with boxing": {
            materials: [
              "MR ply + external Laminate",
              "BWP ply + Acrylic / Corian top"
            ],
            defaultMaterial: "MR ply + external Laminate",
            defaultW: 60, defaultD: 24, defaultH: 36, defaultRate: 1100, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          },
          "Cabinet for counter": {
            materials: [
              "Carcass : BWP ply + internal laminate"
            ],
            defaultMaterial: "Carcass : BWP ply + internal laminate",
            defaultW: 60, defaultD: 18, defaultH: 36, defaultRate: 1850, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      },
      "Accessories": {
        descriptions: {
          "Tandems": {
            materials: [
              "Brand : Hettich"
            ],
            defaultMaterial: "Brand : Hettich",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 10000, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          },
          "Bottle pullout": {
            materials: [
              "Brand : Hettich"
            ],
            defaultMaterial: "Brand : Hettich",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 12000, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          },
          "Wicker baskets": {
            materials: [
              "Brand : Hettich"
            ],
            defaultMaterial: "Brand : Hettich",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 8000, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          },
          "Pantry Unit": {
            materials: [
              "Brand : Hettich"
            ],
            defaultMaterial: "Brand : Hettich",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 50000, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          },
          "Cutlery tray": {
            materials: [
              "Complimentary"
            ],
            defaultMaterial: "Complimentary",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 0, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          },
          "Plate tray": {
            materials: [
              "Complimentary"
            ],
            defaultMaterial: "Complimentary",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 0, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      }
    }
  },

  "Master bedroom": {
    title: 'Master Bedroom Suite Specifications',
    defaultImage: '/reference_images/image12.png',
    items: {
      "Bed unit": {
        descriptions: {
          "Bed": {
            materials: [
              "King size storage hydraulic bed",
              "King size bed in ply and laminate (no storage)",
              "bed in ply and laminate"
            ],
            defaultMaterial: "King size storage hydraulic bed",
            defaultW: 72, defaultD: 78, defaultH: 39, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Headboard": {
            materials: [
              "Ply + laminate (cushions will be on acutals)"
            ],
            defaultMaterial: "Ply + laminate (cushions will be on acutals)",
            defaultW: 134, defaultD: 4, defaultH: 45, defaultRate: 850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Headboard Wall panelling": {
            materials: [
              "MR ply + external laminate + charcoal panels + T patti"
            ],
            defaultMaterial: "MR ply + external laminate + charcoal panels + T patti",
            defaultW: 142, defaultD: 2, defaultH: 67, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Bed side table": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
              "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 18, defaultD: 16, defaultH: 18, defaultRate: 6000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Wallpaper": {
            materials: [
              "Wallpaper is provided complimentary at no additional cost along with the bed and wardrobe selection. Designs can be selected from the catalogues."
            ],
            defaultMaterial: "Wallpaper is provided complimentary at no additional cost along with the bed and wardrobe selection. Designs can be selected from the catalogues.",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 0, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Wardrobe": {
        descriptions: {
          "Wardrobe": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
              "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
              "Carcass: MR ply + internal laminate\nShutter: Aluminium profile + fluted glass"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 71, defaultD: 24, defaultH: 84, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Loft": {
            materials: [
              "Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate",
              "Ply framing: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint"
            ],
            defaultMaterial: "Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 122, defaultD: 24, defaultH: 32, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Accessory tray": {
            materials: [
              "One accessory tray is provided complimentary at no additional cost."
            ],
            defaultMaterial: "One accessory tray is provided complimentary at no additional cost.",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 0, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Hangers": {
            materials: [
              "1 dozen hanger is provided complimentary at no additional cost."
            ],
            defaultMaterial: "1 dozen hanger is provided complimentary at no additional cost.",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 0, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Walk in wardrobe": {
        descriptions: {
          "Wardrobe": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Aluminium profiles+fluted glass",
              "Carcass: MR ply + internal laminate\nShutter: Block board + aluminium profiles+fluted glass"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Aluminium profiles+fluted glass",
            defaultW: 86, defaultD: 24, defaultH: 84, defaultRate: 1500, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Open storage": {
            materials: [
              "MR ply + External laminate"
            ],
            defaultMaterial: "MR ply + External laminate",
            defaultW: 13, defaultD: 24, defaultH: 84, defaultRate: 1500, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Loft": {
            materials: [
              "Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 99, defaultD: 24, defaultH: 28, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Study Table": {
        descriptions: {
          "Study table": {
            materials: [
              "MR ply + laminate + foldable hardware",
              "MR ply + laminate",
              "40mm thick table"
            ],
            defaultMaterial: "MR ply + laminate",
            defaultW: 51, defaultD: 24, defaultH: 30, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Open shelves": {
            materials: [
              "MR ply + laminate",
              "MR ply + external Laminate + MS rods + powder coating"
            ],
            defaultMaterial: "MR ply + laminate",
            defaultW: 12, defaultD: 10, defaultH: 12, defaultRate: 800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Dresser": {
        descriptions: {
          "Dresser mirror": {
            materials: [
              "12mm ply backing + mirror",
              "LED mirror with Aluminum framing"
            ],
            defaultMaterial: "12mm ply backing + mirror",
            defaultW: 24, defaultD: 0, defaultH: 72, defaultRate: 800, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Rafters": {
            materials: [
              "MR ply + charcoal panel"
            ],
            defaultMaterial: "MR ply + charcoal panel",
            defaultW: 24, defaultD: 0, defaultH: 96, defaultRate: 1050, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Tall storage": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: Block board + external laminate",
            defaultW: 18, defaultD: 14, defaultH: 96, defaultRate: 1850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  "Parent's bedroom": {
    title: "Parent's Bedroom Specifications",
    defaultImage: '/reference_images/image12.png',
    items: {
      "Bed unit": {
        descriptions: {
          "Bed": {
            materials: [
              "King size storage hydraulic bed",
              "bed in ply and laminate"
            ],
            defaultMaterial: "King size storage hydraulic bed",
            defaultW: 72, defaultD: 78, defaultH: 39, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Bed side table": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
            defaultW: 18, defaultD: 16, defaultH: 18, defaultRate: 6000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Wallpaper": {
            materials: [
              "Wallpaper is provided complimentary at no additional cost along with the bed and wardrobe selection. Designs can be selected from the catalogues."
            ],
            defaultMaterial: "Wallpaper is provided complimentary at no additional cost along with the bed and wardrobe selection. Designs can be selected from the catalogues.",
            defaultW: 0, defaultD: 0, defaultH: 0, defaultRate: 0, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Wardrobe - 1": {
        descriptions: {
          "Wardrobe": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
            defaultW: 84, defaultD: 24, defaultH: 84, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Loft": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
            defaultW: 96, defaultD: 24, defaultH: 28, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Side Storage": {
            materials: [
              "Carcass: MR ply + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate",
            defaultW: 24, defaultD: 18, defaultH: 84, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Seater": {
        descriptions: {
          "Seater with storage": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
            defaultW: 50, defaultD: 18, defaultH: 18, defaultRate: 1500, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Cushion": {
            materials: [
              "40 D Foam + fabric/letherite\nAs per actuals"
            ],
            defaultMaterial: "40 D Foam + fabric/letherite\nAs per actuals",
            defaultW: 50, defaultD: 18, defaultH: 4, defaultRate: 850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  "Son's bedroom": {
    title: "Son's Bedroom Specifications",
    defaultImage: '/reference_images/image12.png',
    items: {
      "Bed unit": {
        descriptions: {
          "Bed": {
            materials: [
              "King size storage hydraulic bed",
              "bed in ply and laminate"
            ],
            defaultMaterial: "King size storage hydraulic bed",
            defaultW: 72, defaultD: 78, defaultH: 39, defaultRate: 1900, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Bed side table": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
            defaultW: 18, defaultD: 16, defaultH: 18, defaultRate: 11000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Wardrobe": {
        descriptions: {
          "Wardrobe": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
            defaultW: 112, defaultD: 24, defaultH: 96, defaultRate: 2650, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Loft": {
            materials: [
              "Ply framing: MR ply + internal laminate\nShutter: MR ply + external laminate",
              "Ply framing: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint"
            ],
            defaultMaterial: "Ply framing: MR ply + internal laminate\nShutter: MR ply + external laminate",
            defaultW: 112, defaultD: 24, defaultH: 30, defaultRate: 1600, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "TV unit": {
        descriptions: {
          "Drawer unit": {
            materials: [
              "Carcass: MR ply + external laminate\nShutter: HDHMR + CNC + PU paint"
            ],
            defaultMaterial: "Carcass: MR ply + external laminate\nShutter: HDHMR + CNC + PU paint",
            defaultW: 72, defaultD: 18, defaultH: 18, defaultRate: 2650, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Back panel": {
            materials: [
              "MR ply + External laminate",
              "HDHMR textured board"
            ],
            defaultMaterial: "MR ply + External laminate",
            defaultW: 72, defaultD: 0, defaultH: 96, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Study Table": {
        descriptions: {
          "Ledge / Table": {
            materials: [
              "40mm thick table",
              "MR ply + Laminate"
            ],
            defaultMaterial: "40mm thick table",
            defaultW: 60, defaultD: 24, defaultH: 30, defaultRate: 1000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Overhead cabinet": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
            defaultW: 60, defaultD: 14, defaultH: 36, defaultRate: 2650, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Tall unit": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: HDHMR + CNC + PU paint",
            defaultW: 24, defaultD: 16, defaultH: 96, defaultRate: 2650, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  "Guest Bedroom": {
    title: 'Guest Bedroom Specifications',
    defaultImage: '/reference_images/image12.png',
    items: {
      "Bed unit": {
        descriptions: {
          "Bed": {
            materials: [
              "King size storage hydraulic bed",
              "King size bed in ply and laminate (no storage)"
            ],
            defaultMaterial: "King size storage hydraulic bed",
            defaultW: 72, defaultD: 78, defaultH: 39, defaultRate: 1900, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Bed side table": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 18, defaultD: 16, defaultH: 18, defaultRate: 9000, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      },
      "Wardrobe": {
        descriptions: {
          "Wardrobe": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 95, defaultD: 24, defaultH: 96, defaultRate: 1850, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          },
          "Loft": {
            materials: [
              "Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate",
            defaultW: 95, defaultD: 24, defaultH: 36, defaultRate: 1350, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  },

  Utility: {
    title: 'Utility & Balcony Specifications',
    defaultImage: '/reference_images/image22.png',
    items: {
      "Over head cabinet": {
        descriptions: {
          "Utility Overhead Cabinet": {
            materials: [
              "Carcass: BWP ply + internal laminate\nShutter: Aluminium profile + Fluted Glass",
              "Carcass: BWP 710 ply + internal laminate\nShutter: HDHMR + external laminate"
            ],
            defaultMaterial: "Carcass: BWP ply + internal laminate\nShutter: Aluminium profile + Fluted Glass",
            defaultW: 24, defaultD: 12, defaultH: 24, defaultRate: 2200, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      },
      "Base cabinet": {
        descriptions: {
          "Sink Base Washing Cabinet": {
            materials: [
              "Carcass : BWP ply 710 marine grade + internal laminate\nShutter: HDHMR + external laminate"
            ],
            defaultMaterial: "Carcass : BWP ply 710 marine grade + internal laminate\nShutter: HDHMR + external laminate",
            defaultW: 48, defaultD: 24, defaultH: 36, defaultRate: 2200, defaultUnit: "No",
            referenceImage: "/reference_images/image22.png"
          }
        }
      }
    }
  },

  Staircase: {
    title: 'Staircase & Under-stair Storage',
    defaultImage: '/reference_images/image12.png',
    items: {
      "Under-stair Storage": {
        descriptions: {
          "Storage cabinet": {
            materials: [
              "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
              "Carcass: MR ply + internal laminate\nShutter: Block board + external laminate"
            ],
            defaultMaterial: "Carcass: MR ply + internal laminate\nShutter: MR ply + external laminate",
            defaultW: 137, defaultD: 24, defaultH: 84, defaultRate: 1450, defaultUnit: "No",
            referenceImage: "/reference_images/image12.png"
          }
        }
      }
    }
  }
};

// LocalStorage key for persistent Master Library
const STORAGE_KEY = 'sira_master_library';

function deepMerge(target, source) {
  const output = { ...target };
  if (source && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// Retrieve Master Library (with localStorage persistence)
export function getMasterLibrary() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return deepMerge(DEFAULT_MASTER_LIBRARY, parsed);
    }
  } catch (e) {
    console.error('Error loading master library:', e);
  }
  return DEFAULT_MASTER_LIBRARY;
}

// Save or extend Master Library with new custom Item, Description, or Material
export function saveToMasterLibrary(areaName, itemName, descriptionName, materialName, itemDetails = {}) {
  try {
    const current = getMasterLibrary();
    const updated = JSON.parse(JSON.stringify(current));

    const safeArea = (areaName || 'Living').trim();
    const safeItem = (itemName || 'Custom Item').trim();
    const safeDesc = (descriptionName || 'Custom Specification').trim();
    const safeMat = (materialName || 'Standard Specification').trim();

    if (!updated[safeArea]) {
      updated[safeArea] = { title: `${safeArea} Specifications`, items: {} };
    }
    if (!updated[safeArea].items) {
      updated[safeArea].items = {};
    }
    if (!updated[safeArea].items[safeItem]) {
      updated[safeArea].items[safeItem] = { descriptions: {} };
    }
    if (!updated[safeArea].items[safeItem].descriptions) {
      updated[safeArea].items[safeItem].descriptions = {};
    }

    if (!updated[safeArea].items[safeItem].descriptions[safeDesc]) {
      updated[safeArea].items[safeItem].descriptions[safeDesc] = {
        materials: [safeMat],
        defaultMaterial: safeMat,
        defaultW: itemDetails.width || 0,
        defaultD: itemDetails.depth || 0,
        defaultH: itemDetails.height || 0,
        defaultRate: itemDetails.rate || 0,
        defaultUnit: itemDetails.unit || 'No',
        referenceImage: itemDetails.referenceImage || ''
      };
    } else {
      const descObj = updated[safeArea].items[safeItem].descriptions[safeDesc];
      if (!descObj.materials.includes(safeMat)) {
        descObj.materials.push(safeMat);
        descObj.materials.sort((a, b) => a.localeCompare(b));
      }
      descObj.defaultMaterial = safeMat;
      if (itemDetails.width !== undefined) descObj.defaultW = itemDetails.width;
      if (itemDetails.depth !== undefined) descObj.defaultD = itemDetails.depth;
      if (itemDetails.height !== undefined) descObj.defaultH = itemDetails.height;
      if (itemDetails.rate !== undefined) descObj.defaultRate = itemDetails.rate;
      if (itemDetails.unit !== undefined) descObj.defaultUnit = itemDetails.unit;
      if (itemDetails.referenceImage) descObj.referenceImage = itemDetails.referenceImage;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving to master library:', e);
    return DEFAULT_MASTER_LIBRARY;
  }
}

// Helper to fuzzy match area name in library (e.g. "Master bedroom 01" -> "Master bedroom")
export function findMatchingArea(areaName = '', library = getMasterLibrary()) {
  const norm = areaName.toLowerCase().trim();
  const keys = Object.keys(library);
  
  // Exact match
  const exact = keys.find(k => k.toLowerCase() === norm);
  if (exact) return exact;

  // Partial match
  if (norm.includes('foyer')) return keys.find(k => k.toLowerCase().includes('foyer')) || 'Foyer';
  if (norm.includes('living') || norm.includes('hall')) return keys.find(k => k.toLowerCase().includes('living')) || 'Living';
  if (norm.includes('pooja') || norm.includes('puja')) return keys.find(k => k.toLowerCase().includes('pooja')) || 'Pooja room';
  if (norm.includes('dining')) return keys.find(k => k.toLowerCase().includes('dining')) || 'Dining';
  if (norm.includes('kitchen') || norm.includes('pantry')) return keys.find(k => k.toLowerCase().includes('kitchen')) || 'Kitchen';
  if (norm.includes('parent')) return keys.find(k => k.toLowerCase().includes('parent')) || 'Parent\'s bedroom';
  if (norm.includes('son')) return keys.find(k => k.toLowerCase().includes('son')) || 'Son\'s bedroom';
  if (norm.includes('guest')) return keys.find(k => k.toLowerCase().includes('guest')) || 'Guest Bedroom';
  if (norm.includes('master')) return keys.find(k => k.toLowerCase().includes('master')) || 'Master bedroom';
  if (norm.includes('bed') || norm.includes('room')) return keys.find(k => k.toLowerCase().includes('master')) || 'Master bedroom';
  if (norm.includes('utility') || norm.includes('balcony')) return keys.find(k => k.toLowerCase().includes('utility')) || 'Utility';
  if (norm.includes('stair')) return keys.find(k => k.toLowerCase().includes('stair')) || 'Staircase';

  return keys[0] || 'Living';
}

// Alphabetically sorted Areas
export function getSortedAreas(library = getMasterLibrary()) {
  return Object.keys(library).sort((a, b) => a.localeCompare(b));
}

// Alphabetically sorted Items for an Area
export function getSortedItemsForArea(areaName, library = getMasterLibrary()) {
  const matchedArea = findMatchingArea(areaName, library);
  if (!matchedArea || !library[matchedArea]?.items) return [];
  return Object.keys(library[matchedArea].items).sort((a, b) => a.localeCompare(b));
}

// Alphabetically sorted Descriptions for an Item
export function getSortedDescriptionsForItem(areaName, itemName, library = getMasterLibrary()) {
  const matchedArea = findMatchingArea(areaName, library);
  if (!matchedArea || !library[matchedArea]?.items?.[itemName]?.descriptions) return [];
  return Object.keys(library[matchedArea].items[itemName].descriptions).sort((a, b) => a.localeCompare(b));
}

// Alphabetically sorted Materials for a Description
export function getSortedMaterialsForDescription(areaName, itemName, descriptionName, library = getMasterLibrary()) {
  const matchedArea = findMatchingArea(areaName, library);
  const desc = library[matchedArea]?.items?.[itemName]?.descriptions?.[descriptionName];
  if (!desc?.materials) return [];
  return [...desc.materials].sort((a, b) => a.localeCompare(b));
}

// Helper to get specs for a description
export function getSpecsForDescription(areaName, itemName, descriptionName, library = getMasterLibrary()) {
  const matchedArea = findMatchingArea(areaName, library);
  return library[matchedArea]?.items?.[itemName]?.descriptions?.[descriptionName] || null;
}

// Conversion & Two-Highest Dimension Sft Calculator
// Takes two highest dimensions among W, D, H to calculate front-facing elevation millwork area
export function calculateElevationSft(w, d, h, unit = 'in') {
  const numW = parseFloat(w) || 0;
  const numD = parseFloat(d) || 0;
  const numH = parseFloat(h) || 0;

  const validDims = [numW, numD, numH].filter(v => v > 0);
  if (validDims.length === 0) {
    return { sft: 0, usedInches: [], formula: '0 Sft' };
  }

  // Convert all dimensions to inches if unit is mm
  const dimsInInches = unit === 'mm' ? validDims.map(v => v / 25.4) : validDims;

  // Sort descending to pick two highest dimensions
  const sorted = [...dimsInInches].sort((a, b) => b - a);

  if (sorted.length >= 2) {
    const dim1 = sorted[0];
    const dim2 = sorted[1];
    const sft = Math.round((dim1 * dim2) / 144 * 100) / 100;
    return {
      sft,
      usedInches: [Math.round(dim1 * 10) / 10, Math.round(dim2 * 10) / 10],
      formula: `${Math.round(dim1 * 10) / 10}" × ${Math.round(dim2 * 10) / 10}" (2 highest) = ${sft} Sft`
    };
  } else {
    const dim1 = sorted[0];
    const sft = Math.round((dim1 / 12) * 100) / 100;
    return {
      sft,
      usedInches: [Math.round(dim1 * 10) / 10],
      formula: `${Math.round(dim1 * 10) / 10}" / 12 = ${sft} Rft/Sft`
    };
  }
}

// Convert dimension between 'in' and 'mm'
export function convertDimension(val, fromUnit, toUnit) {
  if (!val || isNaN(val)) return 0;
  const num = parseFloat(val);
  if (fromUnit === toUnit) return num;
  if (fromUnit === 'in' && toUnit === 'mm') {
    return Math.round(num * 25.4);
  }
  if (fromUnit === 'mm' && toUnit === 'in') {
    return Math.round((num / 25.4) * 10) / 10;
  }
  return num;
}

// Legacy helpers & presets (maintained for backwards compatibility)
export const AREA_CATALOG_PRESETS = {
  Kitchen: {
    title: 'Kitchen & Modular Pantry Specifications',
    defaultImage: '/reference_images/image22.png',
    categories: [
      {
        name: 'Base cabinet',
        items: [
          {
            name: 'Modular Base Cabinet with Sink & Hob Cutout',
            category: 'Base cabinet',
            description: 'Modular Base Cabinet with Sink & Hob',
            material: 'Carcass : BWP ply + internal laminate\nShutter: HDHMR + external acrylic sheet\nHandle : Gola profile',
            width: 184,
            depth: 24,
            height: 36,
            sft: 46,
            rate: 2350,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          }
        ]
      },
      {
        name: 'Over head cabinet',
        items: [
          {
            name: 'Fluted Glass Shutter Overhead Cabinet',
            category: 'Over head cabinet',
            description: 'Fluted Glass Shutter Overhead Cabinet',
            material: 'Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass',
            width: 71,
            depth: 12,
            height: 26,
            sft: 13,
            rate: 1500,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          }
        ]
      },
      {
        name: 'Loft',
        items: [
          {
            name: 'Full-Span Kitchen Loft Storage',
            category: 'Loft',
            description: 'Full-Span Kitchen Loft',
            material: 'Ply framing: MR ply + internal laminate\nShutter: MDF + Acrylic sheet',
            width: 224,
            depth: 24,
            height: 28,
            sft: 44,
            rate: 1700,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          }
        ]
      },
      {
        name: 'Tall unit',
        items: [
          {
            name: 'Pantry Tall Unit with Gola Profile',
            category: 'Tall unit',
            description: 'Pantry & Appliance Tall Unit',
            material: 'Carcass: BWP ply + internal laminate\nShutter: HDHMR + Acrylic sheet',
            width: 24,
            depth: 24,
            height: 84,
            sft: 14,
            rate: 2350,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          }
        ]
      },
      {
        name: 'Accessories',
        items: [
          {
            name: 'Hettich Soft-Close Tandem Drawers (5 Sets)',
            category: 'Accessories',
            description: 'Tandems brand: Hettich',
            material: 'Brand : Hettich',
            width: 0,
            depth: 0,
            height: 0,
            sft: 1,
            rate: 10000,
            qty: 5,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          },
          {
            name: 'Hettich 2-Tier Bottle Pullout',
            category: 'Accessories',
            description: 'Bottle pullout',
            material: 'Brand : Hettich',
            width: 0,
            depth: 0,
            height: 0,
            sft: 1,
            rate: 12000,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          },
          {
            name: 'Wicker Baskets (Set of 3)',
            category: 'Accessories',
            description: 'Wicker baskets',
            material: 'Brand : Hettich',
            width: 0,
            depth: 0,
            height: 0,
            sft: 1,
            rate: 8000,
            qty: 3,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          },
          {
            name: 'Pantry Unit Swing-Out',
            category: 'Accessories',
            description: 'Pantry Unit',
            material: 'Brand : Hettich',
            width: 0,
            depth: 0,
            height: 0,
            sft: 1,
            rate: 50000,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          },
          {
            name: 'Cutlery Tray (Complimentary)',
            category: 'Cutlery tray',
            description: 'Cutlery tray',
            material: 'Complimentary',
            width: 0,
            depth: 0,
            height: 0,
            sft: 0,
            rate: 0,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          },
          {
            name: 'Plate Tray (Complimentary)',
            category: 'Plate tray',
            description: 'Plate tray',
            material: 'Complimentary',
            width: 0,
            depth: 0,
            height: 0,
            sft: 0,
            rate: 0,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          }
        ]
      }
    ]
  },

  Living: {
    title: 'Living Hall & Foyer Specifications',
    defaultImage: '/reference_images/image12.png',
    categories: [
      {
        name: 'TV unit',
        items: [
          {
            name: 'TV Back Panel (MR Ply + Laminate)',
            category: 'TV unit',
            description: 'Back panel',
            material: 'MR ply boxing + laminate',
            width: 70,
            depth: 0,
            height: 105,
            sft: 51,
            rate: 800,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'TV Rafters Panelling',
            category: 'TV unit',
            description: 'Rafters',
            material: 'MR ply + Charcoal Panel',
            width: 24,
            depth: 0,
            height: 105,
            sft: 18,
            rate: 800,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'TV Tall Display Unit (Aluminium Profile + Glass)',
            category: 'TV unit',
            description: 'Tall cabinet',
            material: 'Carcass: MR ply + external laminate\nShutter: Black Aluminium profile + glass',
            width: 24,
            depth: 18,
            height: 105,
            sft: 18,
            rate: 1300,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'TV Base Drawer Unit (Carcass + Shutter)',
            category: 'TV unit',
            description: 'Drawer unit',
            material: 'Carcass: MR ply + internal laminate\nShutter: Block board + external laminate / aluminium profiles + glass',
            width: 118,
            depth: 17,
            height: 14,
            sft: 14,
            rate: 1300,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'TV Drawer Top Panel',
            category: 'TV unit',
            description: 'Drawer top panel',
            material: 'MR ply + Laminate',
            width: 118,
            depth: 17,
            height: 14,
            sft: 14,
            rate: 800,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          }
        ]
      },
      {
        name: 'Wall Panelling',
        items: [
          {
            name: 'Natural White Oak Veneer + PU Polish',
            category: 'Wall Panelling',
            description: 'Wall Panelling',
            material: 'BWP Marine Ply + Natural White Oak Veneer + PU Polish',
            width: 120,
            depth: 4,
            height: 108,
            sft: 90,
            rate: 2100,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          }
        ]
      }
    ]
  },

  Bedroom: {
    title: 'Bedroom & Wardrobe Specifications',
    defaultImage: '/reference_images/image12.png',
    categories: [
      {
        name: 'Bed unit',
        items: [
          {
            name: 'King Size Storage Hydraulic Bed',
            category: 'Bed unit',
            description: 'Bed',
            material: 'King size storage hydraulic bed',
            width: 72,
            depth: 78,
            height: 39,
            sft: 39,
            rate: 1450,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'Cushioned Headboard',
            category: 'Bed unit',
            description: 'Headboard',
            material: 'Ply + laminate (cushions will be on acutals)',
            width: 134,
            depth: 4,
            height: 45,
            sft: 42,
            rate: 850,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'Bed Side Table (Set of 2)',
            category: 'Bed unit',
            description: 'Bed side table',
            material: 'Carcass: MR ply + internal laminate\nShutter: Block board + external laminate',
            width: 18,
            depth: 16,
            height: 18,
            sft: 2,
            rate: 6000,
            qty: 2,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          }
        ]
      },
      {
        name: 'Wardrobe',
        items: [
          {
            name: 'Floor to Ceiling Wardrobe',
            category: 'Wardrobe',
            description: 'Wardrobe',
            material: 'Carcass: MR ply + internal laminate\nShutter: Block board + external laminate',
            width: 71,
            depth: 24,
            height: 84,
            sft: 41,
            rate: 1450,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'Wardrobe High Loft Storage',
            category: 'Wardrobe',
            description: 'Loft',
            material: 'Ply framing: MR ply + internal laminate\nShutter: Block board + external laminate',
            width: 122,
            depth: 24,
            height: 32,
            sft: 27,
            rate: 1000,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          }
        ]
      }
    ]
  },

  Dining: {
    title: 'Dining Hall Specifications',
    defaultImage: '/reference_images/image12.png',
    categories: [
      {
        name: 'Crockery unit',
        items: [
          {
            name: 'Crockery Display Unit (Glass + Aluminium)',
            category: 'Crockery unit',
            description: 'Crockery unit display',
            material: 'Carcass: MR ply + external laminate\nShutter: Aluminium profile + Glass',
            width: 36,
            depth: 16,
            height: 83,
            sft: 21,
            rate: 1450,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'Crockery Base Cabinet',
            category: 'Crockery unit',
            description: 'Base cabinet',
            material: 'Carcass : BWP ply + internal laminate\nShutter: HDHMR + external glossy laminate\nHandle : G profile',
            width: 75,
            depth: 18,
            height: 30,
            sft: 16,
            rate: 1800,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          }
        ]
      }
    ]
  },

  Pooja: {
    title: 'Pooja Room Mandir Specifications',
    defaultImage: '/reference_images/image12.png',
    categories: [
      {
        name: 'Pooja room',
        items: [
          {
            name: 'Pooja Panelling - Front',
            category: 'Pooja room',
            description: 'Pooja panelling - front',
            material: 'MR ply + external laminate',
            width: 11,
            depth: 0,
            height: 84,
            sft: 7,
            rate: 850,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          },
          {
            name: 'Pooja Elevation Boxing with Veneer',
            category: 'Pooja room',
            description: 'Pooja elevation',
            material: 'Pooja boxing + Veneer + Polishing',
            width: 60,
            depth: 18,
            height: 96,
            sft: 51,
            rate: 1650,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image12.png'
          }
        ]
      }
    ]
  },

  Utility: {
    title: 'Utility & Balcony Specifications',
    defaultImage: '/reference_images/image22.png',
    categories: [
      {
        name: 'Over head cabinet',
        items: [
          {
            name: 'Utility Overhead Storage Cabinet',
            category: 'Over head cabinet',
            description: 'Over head cabinet',
            material: 'Carcass: BWP ply + internal laminate\nShutter: Aluminium profile + Fluted Glass',
            width: 24,
            depth: 12,
            height: 24,
            sft: 4,
            rate: 2200,
            qty: 1,
            unit: 'No',
            referenceImage: '/reference_images/image22.png'
          }
        ]
      }
    ]
  }
};

export function getAreaType(areaName = '') {
  const norm = areaName.toLowerCase();
  if (norm.includes('kitchen') || norm.includes('pantry')) return 'Kitchen';
  if (norm.includes('bed') || norm.includes('room') || norm.includes('guest') || norm.includes('son') || norm.includes('suite')) return 'Bedroom';
  if (norm.includes('living') || norm.includes('hall') || norm.includes('foyer') || norm.includes('drawing')) return 'Living';
  if (norm.includes('dining')) return 'Dining';
  if (norm.includes('pooja') || norm.includes('puja') || norm.includes('mandir')) return 'Pooja';
  if (norm.includes('utility') || norm.includes('balcony') || norm.includes('wash')) return 'Utility';
  return 'Living';
}

export function getCatalogForArea(areaName = '') {
  const roomType = getAreaType(areaName);
  return AREA_CATALOG_PRESETS[roomType] || AREA_CATALOG_PRESETS.Living;
}
