import { getBase44ApiUrl } from "@/core/config.js";
import { getAppConfig } from "@/core/project/index.js";

/**
 * Gets the dashboard URL for a project.
 *
 * @param projectId - Optional project ID. If not provided, uses cached appId from getAppConfig().
 * @returns The dashboard URL
 * @throws Error if no projectId provided and app config is not initialized
 */
export function getDashboardUrl(projectId?: string): string {
  const id = projectId ?? getAppConfig().id;
  return `${getBase44ApiUrl()}/apps/${id}/editor/workspace/overview`;
}

export function getConnectorsUrl(projectId?: string): string {
  const id = projectId ?? getAppConfig().id;
  return `${getBase44ApiUrl()}/apps/${id}/editor/workspace/app-connections`;
}

/**
 * Gets the remote-control session URL for a project.
 *
 * Opening this URL starts a remote-control session that lets another
 * machine (or the Base44 dashboard) drive the app remotely.
 *
 * @param projectId - Optional project ID. If not provided, uses cached appId from getAppConfig().
 * @returns The remote-control session URL
 * @throws Error if no projectId provided and app config is not initialized
 */
export function getRemoteControlUrl(projectId?: string): string {
  const id = projectId ?? getAppConfig().id;
  return `${getBase44ApiUrl()}/apps/${id}/editor/workspace/remote-control`;
}
