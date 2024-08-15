/*
 * Copyright (c) 2023 Huawei Technologies Co.,Ltd.
 *
 * openInula is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 *          http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import { BELONG_CLASS_VNODE_KEY, VNode } from './vnode/VNode';

export { VNode } from './vnode/VNode';
// import { Props } from './utils/InternalKeys';
export type Props = Record<string, any> & {
  autoFocus?: boolean;
  children?: any;
  disabled?: boolean;
  hidden?: boolean;
  style?: { display?: string };
};

type Trigger<A> = (A) => void;

export type UseStateHookType = {
  useState<S>(initialState: (() => S) | S): [S, Trigger<((S) => S) | S>];
};
export type UseReducerHookType = {
  useReducer<S, P, A>(reducer: (S, A) => S, initArg: P, init?: (P) => S): [S, Trigger<A>];
};
export type UseContextHookType = { useContext<T>(context: ContextType<T>): T };

export type JSXElement = {
  vtype: any;
  src: any;
  type: any;
  key: any;
  ref: any;
  props: any;
  // @ts-ignore
  [BELONG_CLASS_VNODE_KEY]: any;
};

export type ProviderType<T> = {
  vtype: number;
  _context: ContextType<T>;
};

export type ContextType<T> = {
  vtype: number;
  Consumer: ContextType<T> | null;
  Provider: ProviderType<T> | null;
  value: T;
};

export type PortalType = {
  vtype: number;
  key: null | string;
  realNode: any;
  children: any;
};

export type RefType = {
  current: any;
};

export interface PromiseType<R> {
  then<U>(
    onFulfill: (value: R) => void | PromiseType<U> | U,
    onReject: (error: any) => void | PromiseType<U> | U
  ): void | PromiseType<U>;
}

export interface SuspenseState {
  promiseSet: Set<PromiseType<any>> | null; // suspense组件的promise列表
  childStatus: string;
  oldChildStatus: string; // 上一次Suspense的Children是否显示
  didCapture: boolean; // suspense是否捕获了异常
  promiseResolved: boolean; // suspense的promise是否resolve
}

export type Source = {
  fileName: string;
  lineNumber: number;
};

export type Callback = () => void;

export type Container = any & { _treeRoot?: VNode | null };

export interface ReconcilerType {
  createContainer(element: JSXElement): void;
  unmount(container: Container, callback?: () => void): void;
  updateContainer(element: JSXElement, container: Container, callback?: () => void): void;
  getPublicRootInstance(container: Container): any;
  findHostInstance(vNode: VNode): any;
}

export type ElementType = {
  parentNode?: ElementType
  nodeName?: string
  nodeType?: number
} | any
// `hostConfig` 接口定义了与 DOM 操作相关的方法
export interface HostConfigType {
  createPortal: () => any;
  addEventListener: (element: ElementType, eventName: string, fn: (...args: any) => void) => void;
  removeEventListener: (element: ElementType, eventName: string, fn: (...args: any) => void) => void;
  submitAddition: (
    element: ElementType,
    updatePayload: any,
    type: JSXElement['type'],
    oldProps: JSXElement['props']
  ) => void;
  removeChild: (
    parentInstance: any,
    child: any
  ) => void;
  clearContainer: () => void;
  handleControledElements: (target: ElementType, type: string, props: Props) => void;
  isTextChild(type: string, props: Props): boolean;
  updateText(
    element: ElementType, 
    changeList: Record<string, any>, 
    props: Props
  ): void,
  updateElement(
    type: string, 
    element: ElementType, 
    changeList: Record<string, any>, 
    props: Props
  ): void
  appendInitialChild(
    parentInstance: any, 
    child: any
  ): void;
  appendChild(
    parentInstance: any, 
    child: any
  ): void;
  createElement(
    tagName: string, 
    props: Props, 
    parentNamespace: string, 
  ): ElementType,
  createText(text: string): ElementType,
  initElementProps(
    element: Element, 
    tagName: string, 
    rawProps: Props
  ): boolean,
  appendChildBefore(
    parentInstance: any, 
    child: any,
    beforeInstance: any
  ),
  commitUpdate(
    element: ElementType, 
    updatePayload: any, 
    type: string, 
    oldProps: JSXElement['props'], 
    newProps: JSXElement['props'], 
    finishedWork: any
  ): void;
  commitMount(
    element: ElementType, 
    type: string, 
    newProps: JSXElement['props'], 
    finishedWork: any
  ): void;
  commitUnmount(element: ElementType, parent: any): void;
}