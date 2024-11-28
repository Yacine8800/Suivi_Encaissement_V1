"use client";
import React, { useState, useEffect, useMemo } from "react";
import IconSave from "@/components/icon/icon-save";
import IconArrowBackward from "../icon/icon-arrow-backward";
import IconSquareRotated from "../icon/icon-square-rotated";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconFolder from "../icon/icon-folder";
import IconVideo from "../icon/icon-video";
import IconEdit from "@/components/icon/icon-edit";
import AnimateHeight from "react-animate-height";
import IconTxtFile from "../icon/icon-txt-file";
import IconTrashLines from "../icon/icon-trash-lines";
import IconClipboardText from "../icon/icon-clipboard-text";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/store";
import { fetchObjet } from "@/store/reducers/permission/objet-get-slice";
import { fetchpermissions } from "@/store/reducers/permission/list-crud.slice";
import { fetchAddRole } from "@/store/reducers/permission/create-habilitation.slice";
import { Metadata } from "next";

// Définition des types pour les options des sélecteurs
interface Option {
  value: string;
  label: string;
}

interface DataResponse {
  profils: Option[];
  dr_secteurs: { [key: string]: Option[] };
}

interface Objet {
  id: number;
  text: string;
  description: string;
}

interface Permission {
  id: number;
  name: string;
  description?: string;
}

interface RoleProps {
  modalEdit: boolean;
  selectedRole?: {
    name: string;
    description: string;
    permissions: { objectId: number; permissionId: number }[];
  };
}

export const metadata: Metadata = {
  title: "Ajouter un rôle",
};

const Role = ({ modalEdit, selectedRole }: RoleProps) => {
  const dispatch = useDispatch<TAppDispatch>();

  const [personalInfo, setPersonalInfo] = useState({
    libelle: modalEdit && selectedRole ? selectedRole.name : "",
    description: modalEdit && selectedRole ? selectedRole.description : "",
  });

  const [errors, setErrors] = useState({
    libelle: "",
    description: "",
  });

  const objetList: any = useSelector(
    (state: TRootState) => state.ListHabilitation?.data
  );

  const permissionList = useSelector(
    (state: TRootState) => state.permissionCrud.data
  );

  useEffect(() => {
    dispatch(fetchObjet());
    dispatch(fetchpermissions());
  }, [dispatch]);

  const items2 = useMemo(
    () =>
      objetList
        ? objetList?.map(
            (objet: { id: number; name: string; description: string }) => ({
              id: objet.id,
              text: objet.name,
              description: objet.description || "",
            })
          )
        : [],
    [objetList]
  );

  const permissionNames = useMemo(
    () => permissionList?.map((perm: any) => perm?.name) || [],
    [permissionList]
  );

  const [individualSwitches, setIndividualSwitches] = useState<boolean[][]>([]);

  const [globalSwitch, setGlobalSwitch] = useState(false);
  const [treeview, setTreeview] = useState<string[]>([]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Toggle global switch, which controls all individual switches
  const handleGlobalSwitch = () => {
    const newState = !globalSwitch;
    setGlobalSwitch(newState);
    const updatedSwitches = items2?.map(() =>
      permissionNames?.map(() => newState)
    );
    setIndividualSwitches(updatedSwitches);
  };

  // Toggle individual switch for a specific role and permission
  const handleIndividualSwitch = (roleIndex: number, permIndex: number) => {
    const updatedSwitches = [...individualSwitches];
    updatedSwitches[roleIndex][permIndex] =
      !updatedSwitches[roleIndex][permIndex];
    setIndividualSwitches(updatedSwitches);
  };

  // Handle folder expansion in the treeview
  const toggleTreeview = (name: any) => {
    if (treeview.includes(name)) {
      setTreeview((value) => value.filter((d) => d !== name));
    } else {
      setTreeview([...treeview, name]);
    }
  };

  useEffect(() => {
    if (items2?.length > 0 && permissionNames?.length > 0) {
      setIndividualSwitches(
        items2?.map(() => permissionNames?.map(() => false))
      );
    }
  }, [items2, items2?.length, permissionNames, permissionNames?.length]);

  const generateSelectedPermissions = () => {
    const selectedPermissions: { objectId: number; permissionId: number }[] =
      [];

    items2.forEach((item: Objet, roleIndex: number) => {
      permissionList.forEach((permission: Permission, permIndex: number) => {
        if (individualSwitches[roleIndex]?.[permIndex]) {
          selectedPermissions.push({
            objectId: item.id, // ID de l'objet
            permissionId: permission.id, // ID de la permission
          });
        }
      });
    });

    return selectedPermissions;
  };

  const handleSave = () => {
    const selectedPermissions = generateSelectedPermissions();

    const roleData = {
      name: personalInfo.libelle,
      description: personalInfo.description,
      permissions: selectedPermissions,
    };

    if (modalEdit) {
      // Dispatch update if modalEdit is true
      // dispatch(fetchUpdateRole(roleData));
      alert('La fonction est en cours de traitement')
    } else {
      // Dispatch create if modalEdit is false
      dispatch(fetchAddRole(roleData));
    }
  };

  // Render Permission TreeView (Folders and Files with Icons)
  const renderPermissionTree = () => {
    return (
      <ul className="font-semibold">
        <li className="py-[5px]">
          <button
            type="button"
            className={`${
              treeview.includes(personalInfo.libelle) ? "active" : ""
            }`}
            onClick={() => toggleTreeview(personalInfo.libelle)}
          >
            <IconCaretDown
              className={`relative -top-1 inline h-5 w-5 text-primary ltr:mr-2 rtl:ml-2 ${treeview.includes(personalInfo.libelle) && "rotate-180"}`}
            />
            <IconFolder className="relative -top-1 inline text-primary ltr:mr-2 rtl:ml-2" />
            {personalInfo.libelle}
          </button>
          <AnimateHeight
            duration={300}
            height={treeview.includes(personalInfo.libelle) ? "auto" : 0}
          >
            <ul className="ltr:pl-14 rtl:pr-14" style={{ overflowY: 'auto', maxHeight: '440px' }}>
              {items2?.map((role: { text: any; id: any }, roleIndex: any) => {
                const isRoleVisible = individualSwitches[roleIndex]?.some(
                  (state: any) => state
                );
                if (!isRoleVisible) return null;

                const isRoleOpen = treeview.includes(role.text);

                return (
                  <li key={role.id} className="py-[5px]">
                    <button
                      type="button"
                      className={`${isRoleOpen ? "active" : ""}`}
                      onClick={() => toggleTreeview(role.text)}
                    >
                      <IconCaretDown
                        className={`relative -top-1 inline h-5 w-5 text-primary ltr:mr-2 rtl:ml-2 ${isRoleOpen && "rotate-180"}`}
                      />
                      <IconFolder className="relative -top-1 inline text-primary ltr:mr-2 rtl:ml-2" />
                      {role.text}
                    </button>
                    <AnimateHeight
                      duration={300}
                      height={isRoleOpen ? "auto" : 0}
                    >
                      <ul className="ltr:pl-14 rtl:pr-14">
                        {permissionNames?.map((permission, permIndex) => {
                          if (!individualSwitches[roleIndex][permIndex]) return null;

                          let IconComponent = IconTxtFile;
                          switch (permission) {
                            case "CREATION":
                              IconComponent = IconSave;
                              break;
                            case "LIRE":
                              IconComponent = IconVideo;
                              break;
                            case "MODIFICATION":
                              IconComponent = IconEdit;
                              break;
                            default:
                              break;
                          }
                          return (
                            <li key={permission} className="flex items-center py-2">
                              <IconComponent className="text-primary" />
                              <span className="ltr:ml-2 rtl:mr-2">{permission}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </AnimateHeight>
                  </li>
                );
              })}
            </ul>
          </AnimateHeight>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mr-4">
          <input
            type="text"
            name="libelle"
            value={personalInfo.libelle}
            onChange={handlePersonalInfoChange}
            placeholder="Libellé"
            className="w-full"
          />
          {errors.libelle && <div className="text-red-500">{errors.libelle}</div>}
        </div>
        <div>
          <input
            type="text"
            name="description"
            value={personalInfo.description}
            onChange={handlePersonalInfoChange}
            placeholder="Description"
            className="w-full"
          />
          {errors.description && <div className="text-red-500">{errors.description}</div>}
        </div>
      </div>

      {renderPermissionTree()}

      <div className="flex justify-end mt-4">
        <button onClick={handleSave} className="bg-primary p-2 text-white">
          <IconSave />
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default Role;
