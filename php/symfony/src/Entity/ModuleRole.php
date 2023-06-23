<?php

namespace App\Entity;

use App\Repository\ModuleRoleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ModuleRoleRepository::class)]
#[ORM\Table(name: 'module_role')]
class ModuleRole
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'PivotModules')]
    #[ORM\JoinColumn(nullable: false)]
    private ?role $role = null;

    #[ORM\ManyToOne(inversedBy: 'PivotRole')]
    #[ORM\JoinColumn(nullable: false)]
    private ?module $module = null;

    #[ORM\Column]
    private ?bool $can_read = null;

    #[ORM\Column]
    private ?bool $can_write = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRole(): ?role
    {
        return $this->role;
    }

    public function setRole(?role $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getModule(): ?module
    {
        return $this->module;
    }

    public function setModule(?module $module): static
    {
        $this->module = $module;

        return $this;
    }

    public function isCanRead(): ?bool
    {
        return $this->can_read;
    }

    public function setCanRead(bool $can_read): static
    {
        $this->can_read = $can_read;

        return $this;
    }

    public function isCanWrite(): ?bool
    {
        return $this->can_write;
    }

    public function setCanWrite(bool $can_write): static
    {
        $this->can_write = $can_write;

        return $this;
    }
}
