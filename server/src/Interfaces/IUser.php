<?php

namespace React\Interfaces;

/**
 * Interface IUser used for usersData.json
 * @package React\Interfaces
 */
abstract class IUser {
  /** @var string User Name/Pseudo */
  public string $username;
  /** @var string User password */
  public string $pwd;
}