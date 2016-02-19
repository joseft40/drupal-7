<?php
/**
  * Modulo para la gestión de los iconos que conforman la pagina principal de los entes planificadores.
  * Sistema Automatizado para la Planificación Estratégico-Situacional en la Administración Pública Venezolana
  * @file ente_planificador_page_home.module
  * Drupal part Module to code ente planificador module
  * Copyright 2011 Sistema Automatizado para la Planificación Estratégico-Situacional en la Administración Pública Venezolana (CENDITEL)
  *
  * This program is free software; you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation; either version 2 of the License, or
  * (at your option) any later version.
  * 
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  * 
  * You should have received a copy of the GNU General Public License
  * along with this program; if not, write to the Free Software
  * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
  *
  * @author Cenditel Merida - Ing. Jose Puentes
  * @date 2015-10-29 // (a&#241;o-mes-dia)
  * @version 0.1 // (0.1)
  *
  */

/**
 * form settings icons
 */
function ente_planificador_page_home_icons_form($form, $form_state) {
  $form['ente_planificador_title_page_home'] = array(
    '#type' => 'textfield',
    '#title' => t('Administrative title'),
    '#description' => t('The name of this page. This will appear in the administrative interface to easily identify it.'),
    '#default_value' => variable_get('ente_planificador_title_page_home'),
  );
  $form['ente_planificador_path_page_home'] = array(
    '#type' => 'textfield',
    '#title' => t('Path'),
    '#description' => t('The URL path to get to this page. You may create named placeholders for variable parts of the path by using %name for required elements and !name for optional elements. For example: "node/%node/foo", "forum/%forum" or "dashboard/!input". These named placeholders can be turned into contexts on the arguments form.'),
    '#default_value' => variable_get('ente_planificador_path_page_home'),
    '#field_prefix' => url(NULL, array('absolute' => TRUE)) . (variable_get('clean_url', 0) ? '' : '?q='),
  );

  $frontpage = variable_get('site_frontpage', 'node');
  $form['ente_planificador_frontpage_page_home'] = array(
    '#type' => 'checkbox',
    '#default_value' => variable_get('ente_planificador_frontpage_page_home', FALSE),
    '#title' => t('Make this your site home page.'),
    '#description' => t('To set this panel as your home page you must create a unique path name with no % placeholders in the path. The site home page is currently set to %homepage on the !siteinfo configuration form.', array('!siteinfo' => l(t('Site Information'), 'admin/config/system/site-information'), '%homepage' => '/' . $frontpage)),
    );
  
  $form['icons'] = array(
    '#type' => 'fieldset',
    '#title' => t('Icons list'),
    '#tree' => TRUE,
    '#prefix' => '<div id="inline-items-table">',
    '#suffix' => '</div>',
  );
  $options = array();
  $result = ente_planificador_page_home_items_parent_get_data();
  foreach ($result as $item) {
    if ($item->fid_image != 'is_group') {
      $options[$item->id]["upload"] = array(
        '#title' => t('Icono'),
        '#type' => 'managed_file',
        '#theme' => 'ente_planificador_page_home_thumbnail_upload',
        '#upload_validators' => array(
          'file_validate_image_resolution'=> array('150x150'),
          'file_validate_extensions' => array('png gif jpg jpeg'),
        ),
        '#default_value' => isset($item->fid_image) ? $item->fid_image : NULL,
        '#upload_location' => file_default_scheme() . '://icons_home/',
      );
    }
    else {
      $options[$item->id]["upload"] = array(
        '#type' => 'hidden',
        '#value' => $item->fid_image,
        '#prefix' => '<div>Grupo de Iconos</div>',
      );
    }
    $options[$item->id]["title"] = array(
      '#type' => 'textfield',
      '#title' => t('Nombre del Icono'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["title"]) ? $form_state['values']["title"]: $item->name,
    );
    $options[$item->id]["description"] = array(
      '#type' => 'textfield',
      '#title' => t('Descripcion del Icono'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["description"]) ? $form_state['values']["description"] : $item->description,
    );
    if ($item->fid_image != 'is_group') {
      $options[$item->id]["path"] = array(
        '#type' => 'textfield',
        '#title' => t('URL del Icono'),
        '#size' => 20,
        '#default_value' => isset($form_state['values']["path"]) ? $form_state['values']["path"] : $item->path,
      );
    }
    else {
      $options[$item->id]["path"] = array(
        '#type' => 'hidden',
        '#value' => NULL,
      );
    }
    $options[$item->id]["weight"] = array(
      '#type' => 'weight',
      '#title' => t('Weight'),
      '#delta' => 10,
      '#title_display' => 'invisible',
      '#default_value' => isset($form_state['values']["weigh"]) ? $form_state['values']["weight"] : $item->weight,
    );
    $options[$item->id]["parent"] = array(
      '#title_display' => 'invisible',
      '#type' => 'hidden',
      '#size' => 3,
      '#default_value' => isset($form_state['values']["weigh"]) ? $form_state['values']["weight"] : $item->parent,
    );
    $options[$item->id]["depth"] = array(
      '#title_display' => 'invisible',
      '#type' => 'hidden',
      '#value' => $item->depth,
    );
    $options[$item->id]["type"] = array(
      '#title_display' => 'invisible',
      '#type' => 'hidden',
      '#value' => is_numeric($item->fid_image) ? 'leaf' : 'group',
    );
    $options[$item->id]["id"] = array(
      '#title_display' => 'invisible',
      '#type' => 'hidden',
      '#value' => $item->id,
    );
    $options[$item->id]["remove"] = array(
      '#type' => 'checkbox',
      '#title' => t('Remove'),
    );
  }

  //add new icons
  $options['new_field'] = array(
    "upload" => array(
      '#title' => t('Icono'),
      '#type' => 'managed_file',
      '#theme' => 'ente_planificador_page_home_thumbnail_upload',
      '#upload_validators' => array(
        'file_validate_image_resolution'=>array('150x150'),
        'file_validate_extensions' => array('png gif jpg jpeg'),
      ),
      '#upload_location' => file_default_scheme() . '://icons_home/',
      '#progress_indicator' => 'throbber',
      '#extended' => TRUE,
    ),
    "title" => array(
      '#type' => 'textfield',
      '#title' => t('Nombre del Icono'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["title"]) ? $form_state['values']["title"]: NULL,
    ),
    "description" => array(
      '#type' => 'textfield',
      '#title' => t('Descripcion del Icono'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["description"]) ? $form_state['values']["description"]: FALSE,
    ),
    "path" => array(
      '#type' => 'textfield',
      '#title' => t('URL del Icono'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["path"]) ? $form_state['values']["path"]: FALSE,
    ),
    "weight" => array(
      '#type' => 'weight',
      '#title' => t('Weight'),
      '#delta' => 10,
      '#title_display' => 'invisible',
      '#default_value' => isset($form_state['values']["weigh"]) ? $form_state['values']["weight"] : '-5',
    ),
    "parent" => array('#type' => 'hidden', '#size' => 3, '#value' => 0, '#title_display' => 'invisible'),
    "depth" => array('#type' => 'hidden', '#value' => 0, '#title_display' => 'invisible'),
    "type" => array('#type' => 'hidden', '#value' => 'leaf', '#title_display' => 'invisible'),
    "id" => array('#type' => 'hidden', '#value' => NULL, '#title_display' => 'invisible'),
    "remove" => array('#type' => 'hidden', '#value' => NULL, '#title_display' => 'invisible'),
  );

  //add new group
  $options['group_new'] = array(
    "upload" => array(
      '#type' => 'hidden',
      '#value' => 'is_group',
      '#prefix' => '<div>Agregar nuevo Grupo de Iconos</div>',
    ),
    "title" => array(
      '#type' => 'textfield',
      '#title' => t('Nombre del Grupo'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["title"]) ? $form_state['values']["title"] : NULL,
    ),
    "description" => array(
      '#type' => 'textfield',
      '#title' => t('Descripcion del Grupo'),
      '#size' => 20,
      '#default_value' => isset($form_state['values']["description"]) ? $form_state['values']["description"] : NULL,
    ),
    "path" => array('#type' => 'hidden', '#value' => NULL, '#title_display' => 'invisible'),
    "weight" => array(
      '#type' => 'weight',
      '#title' => t('Weight'),
      '#delta' => 10,
      '#title_display' => 'invisible',
      '#default_value' => isset($form_state['values']["weigh"]) ? $form_state['values']["weight"]: '-5',
    ),
    "parent" => array('#type' => 'hidden', '#size' => 3, '#value' => 0, '#title_display' => 'invisible'),
    "depth" => array('#type' => 'hidden', '#value' => 0, '#title_display' => 'invisible'),
    "type" => array('#type' => 'hidden', '#value' => 'group', '#title_display' => 'invisible'),
    "id" => array('#type' => 'hidden', '#value' => NULL, '#title_display' => 'invisible'),
    "remove" => array('#type' => 'hidden', '#value' => NULL, '#title_display' => 'invisible'),
  );
  //headers to table
  $header = array(
    'icon' => array('data' => t('Name')),
    'description' => array('data' => t('Description')),
    'path' => array('date' => t('Path')),
    'weight' => array('data' => t('Weight'), 'colspan' => 6),
  );
  $form['icons']['table'] = array(
    '#theme' => 'ente_planificador_page_home_table_form',
    '#header' => $header,
    'rows' => $options,
    '#weight' => 1,
  );
  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array('#type' => 'submit', '#value' => t('Save Changes'));
  return $form;
}

/**
 * Validate front page path.
 */
function ente_planificador_page_home_icons_validate(&$form, &$form_state) {
  $rows = $form_state['values']['icons']['table']['rows'];
  foreach ($rows as $key => $value) {
    if (!drupal_valid_path($value['path']) && !empty($value['path'])) {
      form_set_error($value['path'], t("The path '%path' is either invalid or you do not have access to it.", array('%path' => $value['path'])));
    }
  }
}

/**
 *  Submit callback for the ente_planificador_page_home_icons_form form.
 */
function ente_planificador_page_home_icons_form_submit(&$form, &$form_state) {
  //update site_frontpage
  if ($form_state['values']['ente_planificador_frontpage_page_home']) {
    variable_set('site_frontpage', variable_get('ente_planificador_path_page_home'));
  }
  else {
    variable_set('site_frontpage', 'node');
  }
  //update to values
  variable_set('ente_planificador_path_page_home', $form_state['values']['ente_planificador_path_page_home']);
  variable_set('ente_planificador_frontpage_page_home', $form_state['values']['ente_planificador_frontpage_page_home']);
  variable_set('ente_planificador_title_page_home', $form_state['values']['ente_planificador_title_page_home']);

  $icons_directory = file_default_scheme() . '://icons_home';
  // Prepare the pictures directory.
  if (!file_prepare_directory($icons_directory, FILE_CREATE_DIRECTORY)) {
    file_prepare_directory($icons_directory, FILE_CREATE_DIRECTORY);
  }
  $rows = $form_state['values']['icons']['table']['rows'];
  foreach ($rows as $key => $value) {
    if (!empty($value["title"]) && empty($value["remove"])) {
      $image = new stdClass();
      if (!empty($form_state['complete form']['icons']['table']['rows'][$key]['upload']['#file'])) {
        $image = $form_state['complete form']['icons']['table']['rows'][$key]['upload']['#file'];
      }
      $fields = array(
        'fid_image' => isset($image->fid) ? $image->fid : $value["upload"],
        'name' => $value["title"],
        'path' => isset($value["path"]) ? $value["path"] : NULL,
        'description' => $value["description"],
        'weight' => $value["weight"],
        'parent' => isset($value["parent"]) ? $value["parent"] : 0,
        'depth' => isset($value["depth"]) ? $value["depth"] : 0,
      );
      if (empty($value["id"])) {
        db_insert('ente_planificador_page_home')
          ->fields($fields)
        ->execute();
      }
      else {
       db_update('ente_planificador_page_home')
         ->fields($fields)
        ->condition('id', $value['id'], '=')
        ->execute();
      }
      if (!empty($form_state['complete form']['icons']['table']['rows'][$key]['upload']['#file'])) { //add to image
        $file = file_load($image->fid);
        $file->status = FILE_STATUS_PERMANENT;
        file_save($file);
        file_usage_add($file, 'ente_planificador_page_home', 'home_image', 1);
      }
    }
    else {
      if ($childrens = ente_planificador_page_home_items_hierarchical_get_tree($value['id'])) { //remove to childrens
        foreach ($childrens as $child) {
          if (is_numeric($child['fid_image'])) {
            $file = file_load($child['fid_image']);
            file_delete($file);
          }
          db_delete('ente_planificador_page_home')
            ->condition('id', $child['id'], '=')
            ->execute();
        }
      }
      if (is_numeric($value['upload'])) {
        $file = file_load($value['upload']);
        file_delete($file);
      }
      db_delete('ente_planificador_page_home')
        ->condition('id', $value['id'], '=')
        ->execute();
    }
  }
  return $form;
}
