export const permissions = {
  admin: {
    products: {
      create: true,
      update: true,
      delete: true,
      view: true,
    },

    suppliers: {
      create: true,
      update: true,
      delete: true,
      view: true,
    },

    users: {
      create: true,
      update: true,
      delete: true,
      view: true,
    },
  },

  employee: {
    products: {
      create: false,
      update: true,
      delete: false,
      view: true,
    },

    suppliers: {
      create: false,
      update: false,
      delete: false,
      view: true,
    },

    users: {
      create: false,
      update: false,
      delete: false,
      view: false,
    },
  },

  guest: {
    products: {
      create: false,
      update: false,
      delete: false,
      view: false,
    },

    suppliers: {
      create: false,
      update: false,
      delete: false,
      view: false,
    },

    users: {
      create: false,
      update: false,
      delete: false,
      view: false,
    },
  },
};

export function hasPermission(
  role: string | null | undefined,
  resource: keyof typeof permissions.admin,
  action: "create" | "update" | "delete" | "view"
) {
  // Validamos si el rol ingresado realmente existe en nuestro objeto de permisos
  const validRole =
    role && role in permissions ? (role as keyof typeof permissions) : "guest";

  return permissions[validRole]?.[resource]?.[action] || false;
}
